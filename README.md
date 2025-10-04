***

# Dream City - TIFF Viewer for Healthy Cities

## Project Description  
Dream City is an application developed for the NASA Space Apps Challenge 2025, under the challenge [*Data Pathways to Healthy Cities and Human Settlements*](https://www.spaceappschallenge.org/2025/challenges/data-pathways-to-healthy-cities-and-human-settlements/). The project allows visualization of satellite TIFF images from different geospatial layers (false color, natural color, NDVI, environmental suitability, water risk) to analyze environmental and urban conditions in the Rosario region and surroundings.

This solution facilitates urban planners and decision-makers with visual and technical consultation on regulations and technical aspects of various municipalities, integrating environmental data to promote healthy and resilient cities.

## NASA Space Apps 2025 Challenge  
The challenge consists of developing strategies and tools that use satellite and Earth observation data to design healthy and sustainable cities, balancing human needs with environmental protection. Dream City responds to this challenge by enabling spatial and visual analysis of various critical environmental information layers.

## Future Vision

The Dream City project is designed to grow and evolve. Future versions will incorporate additional metrics from the [Open Urban Planning Toolbox](https://blogs.iadb.org/conocimiento-abierto/en/open-urban-planning-toolbox/), [GitHub link](https://github.com/EL-BID/open-urban-planning-toolbox).

The Open Urban Planning Toolbox, developed by the Housing and Urban Development Division at the Inter-American Development Bank (IDB), is a set of open-source tools supporting the entire urban planning process, from initial design through implementation and project evaluation. It leverages global open data and techniques such as artificial intelligence and crowdsourcing, enabling territorial and urban analysis even where official data is lacking.

Key tools include:

- *MAIIA*: An AI algorithm to map informal settlements from satellite images, simplifying access to advanced technologies for governments and researchers.

- *URSA*: An urban planning support system based on satellite analysis that facilitates the collection and visualization of key information about city evolution.

- *UrbanPy*: A tool to obtain detailed maps of urban boundaries, estimate high-granularity population, locate points of interest, and calculate travel times to assess accessibility to essential services.

- *Building Detector*: A model to identify existing structures in images or maps.

- *Urban Growth Prediction Model*: To project future city expansion.

- *OSM Data Extraction*: A tool to generate detailed neighborhood-level maps using OpenStreetMap data without programming.

- *OpenMapKit*: A digital system for field data collection supporting verification and updating on site.

These tools enrich environmental and urban analytic capabilities by providing advanced indicators to assess quality of life, environmental impact, and urban sustainability in Latin American and Caribbean cities.

These new metrics will enhance environmental and urban analysis capacity, contributing advanced indicators to evaluate quality of life, environmental impact, and sustainability in cities.

## First Release Objective

The first version of Dream City focuses on delivering a functional application that provides objective and visually accessible information about the Rosario metropolitan region. This establishes a foundation to facilitate urban planners and decision-makers' access to critical data clearly, fostering informed decision-making for healthy and resilient cities.

## Project Architecture and Logic  
The project consists of two main phases:

1. *TIFF Image Processing:*  
Satellite TIFF files with various bands represent features such as vegetation (NDVI), water risk, and land use. These files are converted to PNG format for easy handling in visual interfaces. Processing and conversion occur in the script dream city gamma.py using libraries such as rasterio, PIL, and PyQt for visualization and geospatial data manipulation.

2. *Web Interface Visualization with Electron:*  
The generated PNGs are used in an Electron-built application that offers a web interface to select municipalities and display relevant normative and technical information for each area. This allows exploring thematic layers over maps, facilitating informed decision-making supported by environmental data.

***

## Technical Details

- Languages: Python (mainly for processing and visualization) and JavaScript (for the final Electron interface), plus CSS and HTML for styling and presentation.
- The script dream city gamma.py performs core processing of geospatial TIFF images:
  - Uses the rasterio library to open and manipulate multiband TIFF files.
  - Converts TIFF images to PNG to enable visualization and use in web interfaces.
  - Implements a graphical interface with PyQt6, including a dropdown selector for thematic layers (viewer mode).
  - Utilizes PyQt6.QtWebEngineWidgets.QWebEngineView to display PNG images inside an embedded browser.
  - Generates small floating legends explaining the symbolism and colors of each layer (urbanization, green areas, water risk).
- This setup allows interactive preview of environmental layers before integrating them into the Electron application.
- Key Python dependencies: PyQt6, PyQtWebEngine, rasterio, Pillow (PIL).
- Final visualization runs in a cross-platform Electron environment that consumes the PNG maps and shows additional normative and technical municipal data.
- Modular and clear visual structure with legends facilitates interpretation of complex environmental maps by both technical and non-technical users.

***

## Requirements and Installation

1. Clone this repository:  
   ```bash
   git clone https://github.com/Upitor87/Dream-city
   ```
   
2. Create and activate a Python virtual environment:  
   ```bash
   python3 -m venv env && source env/bin/activate
   ```
3. Install dependencies:  
   ```bash
   pip install -r requirements.txt
   ```
4. Run the PyQt application for initial TIFF layer processing and visualization:  
   ```bash
   python "dream city gamma.py"
   ```
5. Deploy the Electron application for final visualization and municipal information consultation.

## Using the Electron Application  
- Select the desired thematic layer from the dropdown menu.  
- View rendered maps with legends and explanatory metrics.  
- Explore technical and normative information by municipality.

## License  
This project is licensed under MIT.

***
