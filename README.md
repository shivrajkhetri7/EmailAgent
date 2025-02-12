# EmailAgent

This is an AI-powered email agent built using Node.js and Google Gemini (or Gmail API). It allows you to send emails automatically by providing a prompt. You can use this agent to send emails based on the instructions provided.

## Features

- Sends email through Gmail using the Google Gemini API.
- User-friendly prompt input to easily send emails.
- Simple setup and usage.

## Prerequisites

Before you run this application, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **Google Gemini API credentials** (or Gmail API credentials)
- **NPM (Node Package Manager)**

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/shivrajkhetri7/EmailAgent.git
   ```

2. Navigate to the project folder:

   ```bash
   cd EmailAgent
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up your Google Gemini (or Gmail API) credentials:

   - Follow the [Gmail API setup guide](https://developers.google.com/gmail/api/quickstart) to get your `credentials.json` file.
   - Place the `credentials.json` file in the root directory of the project.

## Usage

1. Run the application using the following command:

   ```bash
   node index.js
   ```

2. Once the application is running, you'll be prompted to type a message or subject for the email you wish to send.

3. The AI agent will process your input and send the email through your configured Gmail account.

## Example

When prompted, you can type something like:

```
Send an email to john.doe@example.com with the subject "Meeting Request" and the body "Hello, John. I would like to schedule a meeting."
```

The agent will then automatically send the email based on your prompt.