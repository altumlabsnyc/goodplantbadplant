from dotenv import load_dotenv
import os
import requests
import json
import logging
from datetime import datetime

"""
algo.py

This module provides the GoodPlantBadPlant algorithm class

Created: 07/21/2023

"""
from dotenv import load_dotenv
import requests
import os
import jsonschema
import json

class GPBP_Algo:
    def __init__(self, k_coeff: float, C: float, threshold: dict):
        """ Constructor - sets the k coefficient and C value for the algorithm.
    
        TODO: There are different k and C values for different plants.
              Ideally, we would have a database of values for different plants,
              and simply just pass a string of what plant we are using 
              and have the class look up the k and C values for that plant.

        """

        self.k_coeff = k_coeff
        self.C = C
        self.T = threshold
        # load environment variables
        load_dotenv()
        self.aqs_key = os.getenv("AIRNOW_API_KEY")

    def _convert_ug_to_ppm(self, granule):
        """ Converts the value of a granule from micrograms per cubic meter to parts per million.
        1 ug/m3 = 0.000001 ppm

        Args:
            granule (dict): A granule from the AirNow API.
        Returns:
            dict: A granule with the value converted to parts per million.
        """

        ug_value = granule["Value"]
        ppm_value = ug_value / 1000

        granule["RawConcentration"] = ppm_value
        granule["Unit"] = "ppm"

        return granule

    def get_aqi_data(self, bounding_box, start_date, end_date):
        """ Gets air quality data from the AirNow API.

        Params:
            minX (str): The minimum longitude value of the bounding box.
            minY (str): The minimum latitude value of the bounding box.
            maxX (str): The maximum longitude value of the bounding box.
            maxY (str): The maximum latitude value of the bounding box.
            bounding_box (str): The bounding box coordinates in the format "minX, minY, maxX, maxY".
            start_date (str): The start date of the data in the format "YYYY-MM-DDT00".
            end_date (str): The end date of the data in the format "YYYY-MM-DDT00".
        Returns:
            list: A list of granules containing air quality data.
        
        Observations by Monioring Site (https://docs.airnowapi.org/Data/docs)
        NOTE: I used PM25 here. They also have Ozone, PM10, CO, NO2, and SO2 data to utilize as well.
        
        (From AirNow website) The AQI reported for ground-level ozone and fine particles (PM2.5) is based on an average 
        of hourly data.For ozone, the AQI is based on the maximum observed 8-hour average from midnight to midnight. 
        For PM2.5, the AQI is simply the 24-hour average. For AQI values reported in real-time, before a full day's
        data are available, the AQI is based on a NowCast calculation.

        """

        airnow_api_url = "https://www.airnowapi.org/aq/data/?startDate={}&endDate={}&parameters=PM25&BBOX={}&dataType=B&format=application/json&verbose=1&monitorType=2&includerawconcentrations=1&API_KEY={}".format(start_date, end_date, bounding_box, self.aqs_key)
        try:
            response = requests.get(airnow_api_url)
        except Exception as e:
            raise Exception("AirNow API call was invalid: {}".format(e))
        data = response.json()

        return data

    def _preprocess_air_quality_data(self, air_quality_data: dict):
        """ Processes air quality data to desired format. This includes truncating negative concentration values, and converting ug/m3 to ppm.

        Params:
            air_quality_data (dict): A dictionary containing air quality data.
        Returns:
            dict: A dictionary containing preprocessed air quality data.
        """

        # TODO: implement other preprocessing steps here
        new_air_quality_data = []

        for granule in air_quality_data:    
            # checks if concentration value is negative, if so, take absolute value of it
            # NOTE: This is due to some of the monitor calibration issues
            if granule["RawConcentration"] < 0:
                granule["RawConcentration"] = abs(granule["RawConcentration"])

            # checks if q is in ug/m3, if so, convert to ppm
            if granule["Unit"] == "ug/m3":
                granule = self._convert_ug_to_ppm(granule)

            new_air_quality_data.append(granule)
     
        return new_air_quality_data

    def calculate_gpbp_granule(self, soil_data: dict, q_granule: dict, time: float):
        """ This function generatesa new granule of data that contains computations needed for the algorithm
            It calculates the plant's chemical values, the smoke coverage (S), 
            conversion factor (R), and the concentration of C13H18O7 and C13H18O6 in the plant (Y)

            Params:
                soil_data (dict): soil data dict
                q_granule (dict): A data granule from the AirNow API.
                time (float): The time exposed to smoke (hours).
                k_coeff (float): The coefficient of permeability (m/s).
                C (float): The concentration of saccharides & aromatic compounds in the plant (ppm).
            Returns:
                dict: A new granule of data that has the algorithm output added to the granule given
        """
        
        X_soil = soil_data["soil_compounds"]

        # q - measurement of air quality (ppm)
        q = q_granule["RawConcentration"]

        # S - Smoke Converage
        S = q * time
        
        # R - Conversion factor of how much of the smoke compounds are absorbed by the plant
        R = S / self.k_coeff

        # Obtain X_plant values using X_soil and R 
        #   Formula: R * [X_soil] = [X_plant]

        X_plant = {
            "guaiacol": X_soil["guaiacol"] * R,
            "o-cresol": X_soil["o-cresol"] * R,
            "m-cresol": X_soil["m-cresol"] * R,
            "p-cresol": X_soil["p-cresol"] * R,
            "syringol": X_soil["syringol"] * R,
        }

        """
            Y - Concentration of C13H18O7 and C13H18O6 in the plant (ppm)

            NOTE: I'm not sure if this is the correct formula to use here to calculate Y.
        """
        Y = {
            "guaiacol": X_plant["guaiacol"] * self.C,
            "m-cresol": X_plant["m-cresol"] * self.C,
            "o-cresol": X_plant["o-cresol"] * self.C,
            "p-cresol": X_plant["p-cresol"] * self.C,
            "syringol": X_plant["syringol"] * self.C,   
        }
        
        return {
            "latitude": q_granule["Latitude"],
            "longitude": q_granule["Longitude"],
            "UTC": q_granule["UTC"],
            "aqi_value": q_granule["AQI"],
            "aqi_category": q_granule["Category"],
            "plant_type": soil_data["plant_type"],
            "unit": soil_data["unit"],
            "soil_compounds": soil_data["soil_compounds"],
            "plant_compounds": X_plant,
            "smoke_coverage": S,
            "conversion_factor": R,
            "negative_phenolic_compounds": Y,
        }

    def evaluate_granule(self, initial_granule: dict, post_granule: dict, threshold: dict):
        """ Evaluates a granule to the given threshold values

        Params:
            initial_granule (dict): The start/initial granule of data
            post_granule (dict): The finish/post granule of data
            threshold (dict): Threshold values for each compound.
        Returns:
            dict: A dictionary containing the evaluation results.
        """ 
        delta_y = {
            "guaiacol": post_granule["negative_phenolic_compounds"]["guaiacol"] - initial_granule["negative_phenolic_compounds"]["guaiacol"],
            "o-cresol": post_granule["negative_phenolic_compounds"]["o-cresol"] - initial_granule["negative_phenolic_compounds"]["o-cresol"],
            "m-cresol": post_granule["negative_phenolic_compounds"]["m-cresol"] - initial_granule["negative_phenolic_compounds"]["m-cresol"],
            "p-cresol": post_granule["negative_phenolic_compounds"]["p-cresol"] - initial_granule["negative_phenolic_compounds"]["p-cresol"],
            "syringol": post_granule["negative_phenolic_compounds"]["syringol"] - initial_granule["negative_phenolic_compounds"]["syringol"],
        }

        # delta_y / T (final number)
        delta_y_over_t = {
            "guaiacol_percent": delta_y["guaiacol"] / threshold["negative_phenolic_compounds"]["guaiacol"],
            "o-cresol_percent": delta_y["o-cresol"] / threshold["negative_phenolic_compounds"]["o-cresol"],
            "m-cresol_percent": delta_y["m-cresol"] / threshold["negative_phenolic_compounds"]["m-cresol"],
            "p-cresol_percent": delta_y["p-cresol"] / threshold["negative_phenolic_compounds"]["p-cresol"],
            "syringol_percent": delta_y["syringol"] / threshold["negative_phenolic_compounds"]["syringol"],
        }

        return delta_y_over_t

    def verify_soil_data(self, soil_data: dict):
        """ Verifies the soil data's format matches with our desired format.

        Params:
            soil_data (dict): A dictionary containing soil data.
        Returns:
            bool: True if the soil data is valid, False otherwise.
        """

        current_dir = os.path.dirname(os.path.abspath(__file__))
        schema_path = os.path.join(current_dir, "../schemas/soil_data_schema.json")

        with open(schema_path) as f:
            schema = json.load(f)
        try:
            jsonschema.validate(instance=soil_data, schema=schema)
        except jsonschema.exceptions.ValidationError as err:
            logging.error("Invalid soil data format: {}".format(err))
            return False

        return True
    
    def run_algorithm(self, bbox: str, start_date: str, end_date: str, 
                      initial_soil_data: dict, post_soil_data: dict, enable_logging: bool = False ):
        """ Takes in x and y coordinates for a bounding box, and a start and end date, and runs the algorithm

        Parameters:
            bbox (str): The bounding box coordinates in the format "minX, minY, maxX, maxY".
            start_date (str): The start date of the data in the format "YYYY-MM-DDT00".
            end_date (str): The end date of the data in the format "YYYY-MM-DDT00".
            initial_soil_data (dict): A dictionary containing the initial soil data.
            post_soil_data (dict): A dictionary containing the post soil data.
            enable_logging (bool): A boolean value to enable logging.
        Returns:
            dict: A dictionary containing the results of the algorithm.
            pre_accident_granule (dict): A dictionary containing the pre accident granule.
            post_accident_granule (dict): A dictionary containing the post accident granule.
        """

        # set logging config based on enable_logging
        logging.basicConfig(
            level=logging.INFO if enable_logging else logging.WARNING, force=True
        )
        
        # get air quality data
        # TODO - make call more customizable
        q_list = self.get_aqi_data(bbox, start_date, end_date)
        logging.info("AirNow API call successful. Data retrieved")
        
        # verify data
        self.verify_soil_data(initial_soil_data)
        self.verify_soil_data(post_soil_data)
        logging.info("Soil data format verified")

        # pre-process air quality data
        q_list = self._preprocess_air_quality_data(q_list)
        logging.info("Air quality data preprocessed")

        # grabs initial and final granules from air quality data
        q_init = q_list[0]
        q_post = q_list[-1]

        # sets time values for pre and post granules
        t_initial = 1
        t_post = (datetime.fromisoformat(q_post["UTC"]) - datetime.fromisoformat(q_init["UTC"])).total_seconds() / 3600

        # get pre and post granules
        logging.info("Running algorithm...")
        pre_accident_granule = self.calculate_gpbp_granule(initial_soil_data, q_init, t_initial)
        post_accident_granule = self.calculate_gpbp_granule(post_soil_data, q_post, t_post)

        results = self.evaluate_granule(pre_accident_granule, post_accident_granule, self.T)
        logging.info("Done")
        return results, pre_accident_granule, post_accident_granule
