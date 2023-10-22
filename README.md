# fantacalcio-voti-live
A nodejs library to download live data from fantacalcio.it api.

# Get started

## npm
Install **fantacalcio-voti-live**:
```console
$ npm i fantacalcio-voti-live@latest
```

To download json live data of a specific day:
```console
$ npm fantacalcio-voti-live <day>
```

For instance, to download live data of day 9:
```console
$ npx fantacalcio-voti-live 9
```

To save data to a file:
```console
$ npx fantacalcio-voti-live 9 > live_data.json
```

## docker

To run the tool from a Docker container:
```console
$ docker run -it andregri/fantacalcio-voti-live:latest <day>
```

For instance, to download live data of day 9:
```console
$ docker run -it andregri/fantacalcio-voti-live:latest 9
```