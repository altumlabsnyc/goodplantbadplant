"""
test_algo.py

This module runs a test on the GoodPlantBadPlant algorithm.

Created: 07/17/2023

"""
from dotenv import load_dotenv
import json
import os
from algorithm.algo import GPBP_Algo

def get_good_example_soil_data():
    """ Returns hard-coded soil data (healthy) for testing purposes.

    Params:
        None
    Returns:
        dict: A dictionary containing soil data.
    """

    soil_data = {
        "plant_type": "grapes",
        "unit": "ppm",
        "soil_compounds": {
            "guaiacol": 1.032,
            "o-cresol": 0.171,
            "m-cresol": 0.032,
            "p-cresol": 0.079,
            "syringol": 0.000076,
        },        
    }

    return soil_data

def get_bad_example_soil_data():
    """ Returns hard-coded soil data (unhealthy) for testing purposes.

    Params:
        None
    Returns:
        dict: A dictionary containing soil data.
    """

    soil_data = {
        "plant_type": "grapes",
        "unit": "ppm",
        "soil_compounds": {
            "guaiacol": 200.127,
            "o-cresol": 2.524,
            "m-cresol": 0.194,
            "p-cresol": 0.096,
            "syringol": 0.000925,
        },        
    }

    return soil_data

if __name__ == "__main__":
    # bounding box coordinates "minX, minY, maxX, maxY"
    # NOTE: bounding box coordinates here are for Napa Valley a day after the Glass Fire started
    minX = "-122.905753"
    minY = "38.413020"
    maxX = "-122.276786"
    maxY = "38.715827"
    bounding_box = "{},{},{},{}".format(minX, minY, maxX, maxY)
    start_date = "2020-09-27T08"
    end_date = "2020-09-28T16"
    
    """ coefficient of permeability - k (m/s)

        NOTE: This is an arbitrary, constant value that was selected based on Cole silt loam soil,
            the type of soil found in Napa Valley. (1)
            
        In addition, according to the FAO (2, 3):
            low k values range from (1e-11, 5e-7) 
            medium k values range from (1e-11, 1e-5)
        
            
        Sources:
            (1) NAPA COUNTY RESOURCE CONSERVATION DISTRICT - Channel Geomorphology Assessment
                https://www.napawatersheds.org/managed_files/Document/2393/Carneros+Geomorph+FinalTechReport.pdf
            
            (2) Food and Agriculture Organization of the United Nations - Soil Permeability
                https://www.fao.org/fishery/docs/CDrom/FAO_Training/FAO_Training/General/x6706e/x6706e09.htm
            
            (3) USDA Natural Resources Conservation Service - COLE Series
                https://soilseries.sc.egov.usda.gov/OSD_Docs/C/COLE.html

        NOTE: Might want to look at soil surveys here: https://archive.org/details/usda-soil-surveys
        TODO: I have set it to 10 for now, but we should look into this more.
    """
    k = 10
    # 2.3785e-7
    # k = 0.00000023785

    """ C - Concentration of saccharides & aromatic compounds in the plant (ppm)
        This is found experimentally using mass spectrometry.

        NOTE: This is an arbitrary, constant value
              
    """
    C = 2.402

    # hard coded threshold value
    # This is the pre-granule data that was generated. We can use this as the threshold for now
    T = {
        "latitude": 38.548493,
        "longitude": -122.517536,
        "UTC": "2020-09-27T08:00",
        "aqi_value": 21,
        "aqi_category": 1,
        "plant_type": "grapes",
        "unit": "ppm",
        "soil_compounds": {
            "guaiacol": 1.032,
            "o-cresol": 0.171,
            "m-cresol": 0.032,
            "p-cresol": 0.079,
            "syringol": 7.6e-05
        },
        "plant_compounds": {
            "guaiacol": 0.4540800000000001,
            "o-cresol": 0.07524000000000002,
            "m-cresol": 0.014080000000000002,
            "p-cresol": 0.034760000000000006,
            "syringol": 3.3440000000000005e-05
        },
        "smoke_coverage": 4.4,
        "conversion_factor": 0.44000000000000006,
        "negative_phenolic_compounds": {
            "guaiacol": 1.0907001600000004,
            "m-cresol": 0.03382016000000001,
            "o-cresol": 0.18072648000000005,
            "p-cresol": 0.08349352000000002,
            "syringol": 8.032288000000002e-05
        }
    }

    # Run GPBP_Algo
    algo = GPBP_Algo(k_coeff = k, C = C, threshold=T)
    pre_soil_data = get_good_example_soil_data()
    post_soil_data = get_bad_example_soil_data()
    results, pre_granule, post_granule = algo.run_algorithm(bounding_box, start_date, end_date, 
                                                            pre_soil_data, post_soil_data, enable_logging=False)

    # print pre values
    print("Initial Point of Glass Fire (Relative-Healthy)")
    print("===========================================")
    print(json.dumps(pre_granule, indent=2))
    print("===========================================")

    # print pre values
    print("8 Hours after Initial Point of Glass Fire (Unhealthy)")
    print("===========================================")
    print(json.dumps(post_granule, indent=2))
    print("===========================================")
    
    print("Delta Y / T")
    print("===========================================")
    print(json.dumps(results, indent=2))

    # save results to json
    cwd = os.getcwd()
    while True:
        user_input = input("\n\nGPBP Algorithm test finished. Save files? (y/n)")
        if user_input == "y":
            try:
                os.makedirs("data", exist_ok=True)
                # save pre_accident_granule
                with open(cwd + "/data/{}_pre_accident_granule.json".format(start_date), "w") as f:
                    # indent here is for easier viewing. It should not be used in practice
                    json.dump(pre_granule, f, indent = 2)
                print("Saved to \"/data/{}_pre_accident_granule.json\"".format(start_date))

                # save post_accident_granule
                with open(cwd + "/data/{}_post_accident_granule.json".format(end_date), "w") as f:
                    # indent here is for easier viewing. It should not be used in practice
                    json.dump(post_granule, f, indent = 2)
                print("Saved to \"/data/{}_post_accident_granule.json\"".format(end_date))

                # save delta_y
                with open(cwd + "/data/{}_{}delta_y.json".format(start_date, end_date), "w") as f:
                    # indent here is for easier viewing. It should not be used in practice
                    json.dump(results, f, indent = 2)
                print("Saved to \"/data/{}_{}delta_y.json\"".format(start_date, end_date))
                print("Files saved successfully.")
            except:
                print("Error! Cannot Save JSON")
        break
    print("GPBP Algorithm test finished.")
    
