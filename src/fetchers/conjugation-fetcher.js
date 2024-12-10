
async function fetchConjugation(verbo) {
    const resp = await fetch("https://www.coniugazione.it/verbo/"+verbo+".php",{});
    const response = await resp.text();
    return response;
}

module.exports = { fetchConjugation};