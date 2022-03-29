<?php

namespace App\Services;

use Intervention\Image\ImageManagerStatic as Image;

class ImageStorageService
{
    private string $folder;
    private string $height;
    private string $width;

    public function __construct(string $folder = '', int $height = 200, int $width = 200)
    {
        $this->folder = $folder;
        $this->height = $height;
        $this->width  = $width;
    }

    /**
     * Save images with dimensions above specified
     *
     * @param array $imageUrls
     * @param integer $size
     * @return array
     */
    public function saveByMinimumSize(array $imageUrls, int $size): array
    {
        Image::configure(array('driver' => 'gd'));

        $res = [];
        foreach ($imageUrls as $imageUrl) {
            try {
                $image = Image::make($imageUrl);
                if ($image->width() < $size || $image->height() < $size) {
                    continue;
                }

                $filename = md5($imageUrl);
                $path = storage_path('app/public/' . $this->folder . '/');
                if (!file_exists($path)) {
                    mkdir($path, 0775, true);
                }
                $fullName = $path . $filename;
                $image->heighten($this->height)
                    ->crop($this->width, $this->height)
                    ->save($fullName);
            } catch (\Exception $ex) {
                continue;
            }

            if (!$res) {
                $res = [
                    'folder' => $this->folder,
                    'cover'  => asset('storage' . '/' . $this->folder . '/' . $filename),
                ];
            }
        }

        return $res;
    }

    public function clear(): void
    {
        $path = storage_path('app/public/' . $this->folder . '/');
        if (is_dir($path)) {
            $files = glob($path . '*', GLOB_MARK);

            foreach ($files as $file) {
                unlink($file);
            }

            rmdir($path);
        }
    }

    public function getAllWithThumbs(): array
    {
        $res = [];

        $path = storage_path('app/public/');
        foreach (glob($path . '*', GLOB_MARK) as $folder) {
            foreach (glob($folder . '*', GLOB_MARK) as $thumb) {
                $res[] = [
					'folder' => basename($folder),
					'cover' => asset('storage' . '/' . basename($folder) . '/' . basename($thumb)),
				];
                break;
            }
        }

        return $res;
    }

    public function getFromFolder(): array
    {
        $res = [];

        if (!$this->folder) {
            return $res;
        }

        $path = storage_path('app/public/' . $this->folder . '/');
        if (is_dir($path)) {
            $files = glob($path . '*', GLOB_MARK);

            foreach ($files as $file) {
                $res[] = [
					'key' => md5($file),
					'url' => asset('storage' . '/' . $this->folder . '/' . basename($file)),
				];
            }
        }

        return $res;
    }
}
