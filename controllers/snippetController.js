const asyncHandler = require("express-async-handler");
const PublicSnippet = require("../models/publicSnippets");

const findSnippet = asyncHandler(async (req, res) => {
    const snippets = await PublicSnippet.find();
    res.json(snippets);
});

const addSnippet = asyncHandler(async (req, res) => {
    
    const {category, keyword, code} = req.body;
    if(!category || !keyword || !code){
        res.status(401)
        throw new Error("All fields are mandatory");
    }
    else {

        const userid = req.user.id;
        const newSnippet = await new PublicSnippet({
            category, keyword, code, userid
        });
        newSnippet.save();
        res.json({snippetAdded : newSnippet});
    }

});

const findSnippetByCategory = asyncHandler(async (req, res) => {
    const category = req.body.category;
    const snippets = await PublicSnippet.find( {category : category} );

    if(!snippets){
        res.status(404)
        throw new Error("Snippets not found");
    }
    else res.json(snippets);
});

const findSnippetByKeyword = asyncHandler(async (req, res) => {
    const keyword = req.body.keyword;
    const snippets = await PublicSnippet.find( {keyword : keyword} );
    
    if(!snippets){
        res.status(404)
        throw new Error("Snippet not found");
    }
    else res.json(snippets);
});

const updateSnippet = asyncHandler(async (req, res) => {
    const keyword = req.body.keyword;
    const code = req.body.code;

    let snippet = await PublicSnippet.find( {keyword : keyword} );

    if(!snippet){
        console.log("Here");
        res.status(404)
        throw new Error("Snippet not found");
    }

    if(snippet[0].userid.toString() !== req.user.id){
        res.status(403)
        throw new Error("User does not have the permission to update this contact");
    }

    const update = await PublicSnippet.updateOne({keyword : keyword}, {code : code});
    snippet = await PublicSnippet.find( {keyword : keyword} );
    res.json(snippet);
});

const deleteSnippet = asyncHandler(async (req, res) => {
    
    const keyword = req.body.keyword;

    const snippet = await PublicSnippet.find( {keyword : keyword} );

    if(!snippet){
        res.status(404)
        throw new Error("Snippet not found");
    }

    if(snippet[0].userid.toString() !== req.user.id){
        res.status(403)
        throw new Error("User does not have the permission to update this contact");
    }

    await PublicSnippet.deleteOne({keyword : keyword});
    res.json({message : "Snippet deleted"});
    
});

const notFound = asyncHandler(async (req, res) => {
    res.json({message : `Route not found`});
});

module.exports = { findSnippet, addSnippet, findSnippetByCategory, findSnippetByKeyword, updateSnippet, deleteSnippet, notFound };