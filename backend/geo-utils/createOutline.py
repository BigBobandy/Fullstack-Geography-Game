import geopandas as gpd
import matplotlib.pyplot as plt
import json
import logging
import os
import sys

# Set up logging
logging.basicConfig(filename='country_plotting.log',
                    level=logging.INFO, filemode='w')

# Create console handler and set level to info
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.INFO)

# Get root logger and add console handler to it
root_logger = logging.getLogger()
root_logger.addHandler(console_handler)

# Load the GeoJSON file
gdf = gpd.read_file('countries.geojson')

# load country names
with open('countryNames.json') as f:
    country_names = json.load(f)

# Convert the list of dictionaries to a single dictionary
country_names_dict = {list(item.keys())[0]: list(
    item.values())[0] for item in country_names}

# Create an output directory for the PNG files if it doesn't exist
output_directory = '../assets/outlines'
os.makedirs(output_directory, exist_ok=True)

# Prepare the figure and axis outside the loop to be reused
fig, ax = plt.subplots()

# Iterate over each country and plot it
for index, row in gdf.iterrows():
    try:
        # Clear previous plots from the axis
        ax.clear()

        # Set axis limits with margin to center the plot
        margin = 0.1
        bounds = gdf.iloc[[index]].total_bounds
        dx = bounds[2] - bounds[0]
        dy = bounds[3] - bounds[1]
        ax.set_xlim(bounds[0] - margin * dx, bounds[2] + margin * dx)
        ax.set_ylim(bounds[1] - margin * dy, bounds[3] + margin * dy)

        # Plot the country with a transparent fill and colored outline
        gdf.iloc[[index]].plot(ax=ax, facecolor='none',
                               edgecolor='black', linewidth=2.0)

        # Turn off the axis
        ax.axis('off')

        # Save the figure with a transparent background
        # Use the country name from the dictionary for the filename
        country_name = country_names_dict.get(row['ISO_A3'], row['ISO_A3'])
        output_filename = os.path.join(
            output_directory, f"{row['ISO_A3']}-{country_name}.svg")
        fig.savefig(output_filename, bbox_inches='tight',
                    pad_inches=0, transparent=True, dpi=300)

        # Log the saved filename
        logging.info(f"Saved: {output_filename}")

        # Log errors
    except Exception as e:
        logging.error(f"Error processing {row['ISO_A3']}: {e}")
