<?php
namespace App\Interfaces;

interface ImageStorageService
{
	public function saveByMinimumSize(array $imageUrls, int $size);
	public function clear();
	public function getAllWithThumbs();
	public function getFromFolder();
}