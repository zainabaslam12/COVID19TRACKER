Covid-19 Tracker India
This project is a web-based application that tracks and displays Covid-19 statistics in India. It fetches data from public APIs and visualizes it using Chart.js. The application displays the number of confirmed, active, recovered, and deceased cases, as well as hospital bed data in different states of India.

Features
Covid-19 Statistics: Displays the number of confirmed, active, recovered, and deceased cases.
Regional Data: Line chart showing Covid-19 statistics by region.
Hospital Data: Bar charts showing the number of rural vs. urban hospital beds and hospitals in different states.
Technologies Used
HTML: Structure of the web page.
CSS: Styling of the web page (Bootstrap and custom CSS).
JavaScript: Fetches data from APIs and updates the DOM and charts.
Chart.js: Library for creating charts.
D3.js: (Optional) For advanced data visualization.
API Endpoints:
Covid-19 Statistics: https://api.rootnet.in/covid19-in/stats/latest
Hospital Data: https://api.rootnet.in/covid19-in/hospitals/beds
Getting Started
Prerequisites
A modern web browser.
Internet connection.
Installation
Clone the repository or download the source code.
Open index.html in your web browser.
Project Structure
index.html: Main HTML file containing the structure of the web page.
covidcss.css: Custom CSS file for additional styling.
main.js: JavaScript file that fetches data from APIs and updates the charts.
Usage
Open the index.html file in your browser.
The web page will automatically fetch the latest data and display it.
View Covid-19 statistics and hospital data through the charts.
