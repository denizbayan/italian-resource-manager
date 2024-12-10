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
                json_conjugation = conjugation_parser.parseHTML(conjugation)
                database_manager.saveConjugation(req.params.verb,JSON.stringify(json_conjugation)).then(x=>{
                    res.status(200).json({
                        json_conjugation
                    })
                })

            });
        }else{
            json_result = query_result[0]
            res.status(200).json({
                json_result
            })
        }
    })
})

module.exports = router