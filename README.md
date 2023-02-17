
### `npm start`


### `App functionality`

The app has multiple modules and depencies based on which a collection is built of 10 files which is also one set.

Modules include
-   Math function
-   A lat long value to radian converter
-   A function to save files which takes in the urls as values to save
-   A function to map over every table to generate csv files based on tables and rows.
-   A function to shuffle the arrays each time a new loop starts
-   An input value that would initiate the process and also determine the number of files a single set would hold.

Formula reosurce refferred 
`https://www.movable-type.co.uk/scripts/latlong.html`

### `Fixed values`

There are multiple fixed values in the creation of the data sets
-   A fixed value for the number of times the loop has to iterate and also determines the number of rows to be kept in a single file within a set
-   A fixed value for a specific coordinate that would render the structure into a circle, this value exists within the math function and can be interchanged between `4` and `2` as this determines the structure of the circle
-   the get all circles button would download the data set generated into an archived zip file


# `Problems`

1. Currently the code is setup on many dependent functions which all work in a single script.

2. A code rewrite would be necessarry to implement a better solution

3. The shuffling currently shuffles individual arrays changing the order of the values set against them

4. Another major problem has to do with the amount of html elements generated in the loop `(fillArr())` which beyond a certain threshold would cause problems and eventually crash the website.

5. The files downloaded also can download more sets than required but would eventually break out because of problem 4.

# `Solution`

1. Separate the `mathfunc` which generates the coordinates based on the input recieved and inital coords recieved.
2. The `mathfunc` should not be used for anything other than doing the math for the coordinates
3. Refactor the `allcircles` function
4. Refactor the `saveFile` function
5. Refactor how `useEffect` works for expecting change
6. Refactor how we pass iterative values for loops within loops
7. The expected result in the JSON data structure should be 
`[{"name": "xyz","location: "xyz","lat": "xyz","long": "xyz",}]`

    - wherein each object in the array represents a row and the `key` represents a column.

8. Each array should be generated from the base values read by the `fileReader` for keywords and descriptions as well as the lat long for the same.

9. Each array is just one circle and ther would be 10 arrays as such that would make up the whole set.

10. The whole array will be saved into a variable and mapped over for the `saveFile` feature to initate the download process. This process would be intiated on button press only.

11. These are the core functions for the new code and existing processes should be removed.


# `Goal`

The user should be able to download a `N` number of set of `10` files each which would all include `2000` rows of values which all represent a coordinate for each pin.

The user should be able to drop two files `keywords` and `descriptions`.

Each file needs to have a randomized order so that every `pin` is not the same particularly `name` and `descriptions`


## `optional`

The set should be random and the number of sets generated should be determined with a list of clients. For eg: `80` clients should produce `80` sets and each set will have `10` files each. Each file will have `2000` rows populated by the `lat`, `long`, `name` and `description`


### `update status 2-16-23`

updated the data structure with correctly shuffled data without affecting the order(above image for name description with shuffling. Each being different than the other).


Currently working on -

1. Refactoring the code to sequentially execute the functions properly and produce the expected csv properly.
2. Setting up a downloadable link to download all the csv data sets collectively.
3. Separating the application to render two views, 1 for syspree, 1 for client list (due to circle shape bug on syspree).

### `update status 2-17-23`

Generating all the files and can generate more currently it slightly pause for 10 files but the pause is much more insignificant than before. The shuffling is happening for every file not without affecting the keyword and description mapping. Also fixed the csv generation process and will only happen on button click where you'll get all the files without causing browser load. Also fixed yesterday's number 2 to sequentially generate the downloadable links for csv. 

Currently working on -
1. Fixing the circle structure and incorrect render of latitude longitude using syspree lat long.
2. Adding dynamic value for number of circle SETS generated.
3. Separation of views.