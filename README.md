# Reading View(reading_view)
_View web pages in a reading mode._

## Desciption 

io.js module for generating customisable easy to read html on the go. 

This project can be found on NPM and installed through that. 

**Important:** Project is in development stage, so big changes could be made!

## Installation

`npm install reading_view`

## Current Version

`0.1.0`

## Using 

#### Getting Started
```
var readingView = require('reading_view');

readingView.convert(url, params, callback);
```

#### Parametrs 
###### Convert Function
|Paramert|Description|
|:-------|:-------|
|url     |URL of web page to convert into reading view|
|params  |Customisation Parametrs for convertation    |
|callback|Function that is called when convertation is done, passes err - for errors, res - html string converted for reading|
###### params in Convert Function 
{

  ⋅⋅**articleQuery**: _String_ | JQuery stiled query to find current article body | **default: article**
  
  ⋅⋅**tagsToInclude**: _Array_ | Each element is a JQuery stiled query to fetch elements inside main article | **default: ['p','img']**
  
  ⋅⋅**title**: {
  
  ⋅⋅⋅⋅**textOnly**: _Boolean_ | Fetch only text from title without current tags | **default: false**
  
  ⋅⋅⋅⋅**tagToWrap**: _String_ | Html tag name, that is wrapping title if *textOnly* is *true* | **default: h2**

  ⋅⋅⋅⋅**query**: _String_ | JQuery styled query to fetch header in article, if there are more than one, fetches first | **default: ${self.articleSelector} h${i}:first where i is Int from 1 to 6**
  }

}

