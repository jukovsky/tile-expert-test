<?php

namespace App\Http\Controllers;

use App\Services\S3ImageStorageService;
use App\Services\PageParserService;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function parse(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'url' => ['required', 'url'],
                'size' => ['required', 'numeric'],
            ]);

            $pageUrl = $validatedData['url'];
            $pageParser = new PageParserService($validatedData['url']);
            $imageStorage = new S3ImageStorageService(md5($pageUrl));

            $sourceImageUrls = $pageParser->getImages();
            $page = $imageStorage->saveByMinimumSize($sourceImageUrls, $validatedData['size']);
        } catch (\Exception $ex) {
            return $this->respondError($ex->getMessage());
        }

		if (!$page) {
            return $this->respondError("No images on page");
		}

        return response()->json([
            'status' => 1,
            'page'   => $page,
        ]);
    }

    public function clear(string $folder)
    {
        try {
            $imageStorage = new S3ImageStorageService($folder);
            $imageStorage->clear();
        } catch (\Exception $ex) {
            return $this->respondError($ex->getMessage());
        }

        return response()->json([
            'status' => 1,
        ]);
    }

    public function all()
    {
        try {
            $imageStorage = new S3ImageStorageService();
            $pages = $imageStorage->getAllWithThumbs();
        } catch (\Exception $ex) {
            return $this->respondError($ex->getMessage());
        }

        return response()->json([
            'status' => 1,
            'pages' => $pages,
        ]);
    }

    public function folder(string $folder)
    {
        try {
            $imageStorage = new S3ImageStorageService($folder);
            $images = $imageStorage->getFromFolder();
        } catch (\Exception $ex) {
            return $this->respondError($ex->getMessage());
        }

        return response()->json([
            'status' => 1,
            'images' => $images,
        ]);
    }

    private function respondError(string $message)
    {
        return response()->json([
            'status' => 0,
            'error'  => $message,
        ]);
    }
}
