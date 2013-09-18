var http = require("http");

var movies = [{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'The Fall ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '2006', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}
,
{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'American Pie ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '1999', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}
,
{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'District 9 ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '2009', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}
,
{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'Inception ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '2010', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}
,
{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'Centurion ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '2010', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}
,
{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'Tinker Tailor Soldier Spy ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '2011', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}
,
{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'Battle Los Angeles ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '2011', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}
,
{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'Memento ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '2000', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}
,
{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'Resident Evil- Afterlife ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '2010', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}
,
{'plot': 'No IMDB info found.', 'rated': 'No info available', 'title': 'Devil ', 'poster': 'img/placeholder.png', 'writer': 'No info available', 'response': 'False', 'director': 'No info available', 'released': 'No info available', 'actors': 'No info available', 'year': '2010', 'genre': 'No info available', 'imdbid': 'No info available', 'runtime': 'No info available', 'type': 'movie', 'imdbrating': 'No info available', 'imdbvotes': 'No info available'}];



var options = {
  hostname: 'localhost',
  port: 80,
  path: '/movies/',
  method: 'POST',
  headers: {'Content-type': 'application/json', 'Accept': 'text/plain'}
};

movies.forEach(function(element, index, array){
  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });


  // write data to request body
  req.write(JSON.stringify(element)); 
  console.log(JSON.stringify(element))
  req.end();
});
