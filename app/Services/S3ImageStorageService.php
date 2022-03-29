<?php

namespace App\Services;

use App\Interfaces\ImageStorageService;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;

class S3ImageStorageService implements ImageStorageService
{
    private string $folder;
    private string $height;
    private string $width;
	private string $path = 'te-test/';

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

                $filename = md5($imageUrl) . '.' . pathinfo($imageUrl, PATHINFO_EXTENSION);
                $path = $this->path . $this->folder . '/';
                $fullName = $path . $filename;
                $image->heighten($this->height)
                    ->crop($this->width, $this->height);
				Storage::put($fullName, $image->stream());
            } catch (\Exception $ex) {
                continue;
            }

            if (!$res) {
                $res = [
                    'folder' => $this->folder,
                    'cover'  =>  Storage::url($fullName),
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
		$added = [];
		foreach (Storage::allFiles($this->path) as $thumb) {
			$folder = explode('/', $thumb)[1];
			if (in_array($folder, $added)) {
				continue;
			}
			$added[] = $folder;
			$res[] = [
				'folder' => $folder,
				'cover'  => Storage::url($thumb),
			];
			break;
		}

        return $res;
    }

    public function getFromFolder(): array
    {
        $res = [];

        if (!$this->folder) {
            return $res;
        }

		foreach (Storage::allFiles($this->path . $this->folder . '/') as $file) {
			$res[] = [
				'key' => md5($file),
				'url' => Storage::url($file),
			];
		}

        return $res;
    }
}
