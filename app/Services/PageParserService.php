<?php

namespace App\Services;

class PageParserService
{
    private string $url;

    /**
     * PageParserService constructor
     *
     * @param string $url
     */
    public function __construct(string $url)
    {
        $this->url = $url;
    }

    /**
     * Parse page by url for images
     *
     * @throws \Exception
     * @return array
     */
    public function getImages(): array
    {
        try {
            $html = file_get_contents($this->url);
        } catch (\Exception $ex) {
            throw $ex;
        }
        preg_match_all('/<img.*?src=[\'"](.*?)[\'"].*?>/i', $html, $matches);

        return $matches[1];
    }
}
