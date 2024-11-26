# Javascript Utils

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

This contains all of the utility functions I use across all my projects. It includes string and date manipulation functions, MongoDB database utils, and OpenAI and Deepgram API helper functions.

## Installation

This project is still in the process of being made available on NPM, this section will be updated after that is completed.

## Usage

Date and time manipulation functions:

| Function Name     | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `slugify`         | Converts a string into a valid URL slug.                                       |
| `deslugify`       | Converts a URL slug into a string for display                                  |
| `capitalizeWords` | Capitalizes each word in a string, useful for generating headers on web pages. |
| `formatDate`      | Converts a Javascript Date into a readable format: MM/DD/YYYY. E.g. 11/26/2024 |

MongoDB utility functions:

| Function Name | Description                                               |
| ------------- | --------------------------------------------------------- |
| `connectDB`   | Connects to a MongoDB database using a connection string. |

API helper functions:

| Function Name            | Description                                   |
| ------------------------ | --------------------------------------------- |
| `deepgramTranscribeFile` | Transcribes an audio file using Deepgram API. |
| `openaiTextToSpeech`     | Converts text to speech using OpenAI API.     |

## Contributing

Contributions are welcome, create a pull request with your suggested changes.

## License

This project is available freely throught the MIT License.

## Contact

I can be reached on [nicolasbolt.com](http://nicolasbolt.com) or on [LinkedIn](https://www.linkedin.com/in/nicolas-bolt-59a523131/).
