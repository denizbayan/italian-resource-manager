const express = require('express')
const router = express.Router()


const conjugation_fetcher = require("../../fetchers/conjugation-fetcher");
const conjugation_parser = require("../../parsers/conjugation-parser");
const database_manager = require("../../utils/database_queries");



router.get('/:verb', (req,res,next) => {
    result = ""


    database_manager.getConjugation(req.params.verb).then(query_result => {
        console.log(query_result)
        if(query_result.length == 0 ){
            conjugation_fetcher.fetchConjugation(req.params.verb).then(conjugation => {
                result = conjugation_parser.parseHTML(conjugation.toLowerCase())
                database_manager.saveConjugation(req.params.verb,JSON.stringify(result)).then(()=>{
                    res.status(200).json({
                        result
                    })
                })

            });
        }else{
            result = JSON.parse(query_result[0].conjugation)
            res.status(200).json({
                result
            })
        }
    })
})

module.exports = router