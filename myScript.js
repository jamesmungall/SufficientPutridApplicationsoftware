function myFunction() {
  document.getElementById("demo").innerHTML = "Paragraph changed.";
}
function get_csv_1(){
  
  document.getElementById("gaia_csv").innerHTML = "HTML request here";
}
async function get_csv() {
  const url = "https://gea.esac.esa.int/tap-server/tap/sync?REQUEST=doQuery&LANG=ADQL&FORMAT=csv&QUERY=SELECT+TOP+25+source_id,ra,dec,distance_gspphot,phot_g_mean_mag,teff_gspphot+FROM+gaiadr3.gaia_source_lite+WHERE+distance_gspphot<23+AND+phot_g_mean_mag<5+ORDER+BY+distance_gspphot";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    document.getElementById("gaia_csv").innerHTML = response;
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

