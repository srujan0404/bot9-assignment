# Chat Assistant Project

## Overview

The Chat Assistant Project is designed to streamline the process of managing bookings through a chat interface. It integrates a sophisticated chat assistant that can handle booking operations, providing users with immediate feedback on their booking status, including confirmation details or error messages in case of issues.

## Features

- **Booking Confirmation**: Automatically confirms bookings and provides users with detailed information such as Booking ID, Room Name, Full Name, Email, Number of Nights, and Total Price.
- **Error Handling**: Informs users if there was an error during the booking process, prompting them to try again.
- **Dynamic Responses**: Utilizes a dynamic response system to handle various chat inputs and functions, ensuring a flexible chat experience.
- **Message Logging**: Keeps a log of all messages exchanged during the chat session for auditing and debugging purposes.

## How It Works

The system listens for specific triggers within the chat interface. Upon detecting a booking operation, it processes the request and returns a response based on the operation's outcome. If the booking is successful, it crafts a detailed confirmation message. In case of an error, it advises the user accordingly. The system also supports dynamic responses for scenarios where the initial response is not set.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using your preferred package manager: `npm install`
4. Start the application: `npm start`
