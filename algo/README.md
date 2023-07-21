# GoodPlantBadPlant Algorithm

![Version](https://img.shields.io/badge/version-0.0.1_alpha-blue)

GoodPlantBadPlant is a proprietary API developed by Altum Labs. This is the implementation for the GoodPlantBadPlant
algorithm that will be used to analyze and predict the amount of harmful chemicals (C13H18O7 and C13H18O6) that could
end up in plants and their soil.

**Please note that this software is not open source and cannot be used without the express permission of Altum Labs.**

## Features

- Transcription of audio from a wet lab .mp4 file using Google Speech.
- Generation of a step-by-step procedural guide from the transcription using GPT-4.

## Installation

**NOTE:** This software is proprietary and its use is restricted. For installation details, please contact Altum Labs

There are only a handful of dependencies:
- Python 3.10
- python-dotenv
- ipykernel
- jsonschema

You can manually install these, or just use one of the following to install the dependencies

Pip

```bash
pip install -e .
```

Conda

```bash
conda develop .
```

### Environment Variables

The following environment variables must be specified in either a dotenv or in the operating system.

- ```AIRNOW_API_KEY``` : This is the AirNow API key that is needed to obtain weather data

## Demo

To run a demo of the algorithm, run the ```test_algo.py``` file.

The script has preset values that are used to test the algorithm


## Authors

- [**Ricky Fok**](https://github.com/FoksWok)
