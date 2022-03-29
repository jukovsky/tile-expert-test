# Test task for PHP devloper role

## Installation

1. Clone this repo using:
  ```shell
  $ git clone git@github.com:rzhukovskiy/tile-expert-test.git
  ```

2. To install dependencies and clean the git repo run:

  ```shell
  $ yarn install
  $ composer install
  ```
  
3. Copy .env.example file to .env and make the necessary changes there

  ```shell
  $ cp .env.example .env
  ```

4. Generate laravel keys

  ```shell
  $ php artisan key:generate
  $ php artisan config:clear
  $ php artisan config:cache
  $ php artisan serve
  ```

5. Run project in Dev mode

  ```shell
  $ yarn run dev
  ```

## Task requirements

* create a web application
* the user should be able to enter the page URL and the minimum image size
* the script should parse the page at the specified address, find images no smaller than the specified size, and save them
* when saving, the images should be reduced in height to 200px, and then cropped in width to 200px as well
* the page should display previously uploaded images
* all interactions with the server part should occur without reloading the page
  
## Stack and tools

* Laravel
* ReactJS
* TalwindCSS
* S3 Amazon storage
