# Reading View(reading_view)
_View web pages in a reading mode._

[![NPM](https://nodei.co/npm/reading_view.png)](https://nodei.co/npm/reading_view/)

## Desciption

io.js module for generating customisable easy to read html on the go.

This project can be found on NPM and installed through that.

**Important:** Project is in development stage, so big changes could be made!

**Example:** [readerview.mopso.co](http://readerview.mopso.co/demo/)

## Installation

`npm install reading_view`

## Current Version

`0.2.1`

## Using

#### Getting Started
```
var readingView = require('reading_view');

readingView.convert(url, params, callback);
```

#### Parametrs
###### Convert Function
|Paramert|Description| Type | 
|:-------|:-------|:-------|
|url     |URL of web page to convert into reading view| Url | 
|params  |Customisation Parametrs for convertation    | Object Params |
|callback|Function that is called when convertation is done, passes err - for errors, res - html string converted for reading| Function|

###### Params Object  in Convert Function
|Paramert|Description| Type | Default |
|:-------|:-------|:-------|:-------|
| articleQuery | JQuery stiled query to find current article body |String  | article |
| tagsToInclude | Each element is a JQuery stiled query to fetch elements inside main article | Array  | ['p','img'] |
| title | Parametrs to define title configuration | Object Title | 

###### Title Object 
|Paramert|Description| Type | Default |
|:-------|:-------|:-------|:-------|
|textOnly| Fetch only text from title without current tags |Boolean  | false|
|tagToWrap| Html tag name, that is wrapping title if *textOnly* is *true* |String|'h2'|
|query| JQuery styled query to fetch header in article, if there are more than one, fetches first | String | "${self.articleSelector} h${i}:first" _where i is Int from 1 to 6_ |

