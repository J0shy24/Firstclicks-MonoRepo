package com.project.firstclicks.controller.course;

import com.project.firstclicks.dto.UploadMediaResponse;
import com.project.firstclicks.service.StorageService;
import lombok.AllArgsConstructor;


import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;

@AllArgsConstructor
@RequestMapping("media")
@RestController
public class MediaController {


    private StorageService storageService;

    @PostMapping("/upload")
    public UploadMediaResponse upload(@RequestParam("file") MultipartFile multipartFile) {
        String path = storageService.store(multipartFile);
        return new UploadMediaResponse(path);
    }

    @GetMapping("/public/{filename}")
    public ResponseEntity<Resource> getResource(@PathVariable String filename) throws IOException {
        Resource resource = storageService.loadAsResource(filename);
        String contentType = Files.probeContentType(resource.getFile().toPath());

        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(resource);
    }

}
