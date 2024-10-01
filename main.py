from astroquery.gaia import Gaia
import pandas as pd

query = ("SELECT "
        "source_id, ra, dec, distance_gspphot, "
        "phot_g_mean_mag, teff_gspphot "
        "FROM gaiadr3.gaia_source_lite "
        "WHERE distance_gspphot < 23 "
        "AND phot_g_mean_mag < 4 "
        "ORDER BY distance_gspphot")

q2 = ("SELECT  distance_gspphot "
        "FROM gaiadr3.gaia_source_lite "
      "WHERE parallax_over_error >= 5 "
      "AND random_index BETWEEN 3000000 AND 40000000 "
      "AND distance_gspphot < 3000 "
     )
      
job = Gaia.launch_job(q2)
results = job.get_results()
df = results.to_pandas()
df.to_csv('gaia_source_lite.csv', index=False)

