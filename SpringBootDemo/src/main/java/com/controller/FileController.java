package com.controller;

import com.entity.User;
import com.entity.File;
import com.service.UserService;
import com.service.FileService;
import com.service.UserActivityService;
import com.service.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/file") // This means URL's start with /demo (after Application path)
public class FileController {
    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @Autowired
    private UserActivityService userActivityService;


    @PostMapping(path = "/fileUpload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE) // Map ONLY POST Requests
    public ResponseEntity<?> fileUpload(@RequestParam(value = "name", required = false) final MultipartFile file) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        System.out.println("----------------------------------000000000000");
        String UPLOADED_FOLDER = "/Users/rajvimodh/Downloads/SpringBootDemoCode/SpringBootDemo/src/files/14/";
        if(file == null) System.out.println("file empty333333333333");
        if (((MultipartFile) file).isEmpty()) {
            System.out.println("file empty");
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {

            // Get the file and save it somewhere

            byte[] bytes = ((MultipartFile) file).getBytes();
           System.out.println("- bytes -- " + bytes);
//            System.out.println("- file name in try -- " + file.getOriginalFilename());
//            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
//            System.out.println("-- path to upload in try --" + path);
//            File.write(path, bytes);

            System.out.println("file uploaded");
            return new ResponseEntity(HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping(path="/download",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> download(@RequestParam("path") String path, @RequestParam("username") String username,@RequestParam("file") String file, HttpSession session) throws IOException {
        System.out.println("download file "+file+" for user "+username+" in the path of "+path);
        InputStreamResource file1=fileService.download(username,file,path);
        userActivityService.logActivity("FileShare", Integer.parseInt(session.getId()));
        return new ResponseEntity(file1,HttpStatus.OK);
    }




    @PostMapping(path = "/getDir", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDir(@RequestBody String file, HttpSession session) {
        //System.out.println("In Dir" + user);
        JSONObject jsonObject = new JSONObject(file);
        // session.setAttribute("name",jsonObject.getString("username"));
        return new ResponseEntity(fileService.getAllFiles(jsonObject.getString("path")), HttpStatus.OK);
    }

    @PostMapping(path = "/makeDirectory", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> makeDirectory(@RequestBody String file) {
        JSONObject jsonObject = new JSONObject(file);
        System.out.println("------- in MAKE directory ------" + file);

        return new ResponseEntity(fileService.makeDirectory(jsonObject.getString("name"), jsonObject.getString("path")), HttpStatus.OK);
    }

    @PostMapping(path = "/deleteDirectory", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteDirectory(@RequestBody String file) {
        JSONObject jsonObject = new JSONObject(file);
        System.out.println("------- in DELETE directory ------" + file);

        return new ResponseEntity(fileService.deleteDirectory(jsonObject.getString("name"), jsonObject.getString("path")), HttpStatus.OK);
    }

    @PostMapping(path = "/doStar", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> doStar(@RequestBody File file) {
   //    JSONObject jsonObject = new JSONObject(file);
    //    System.out.println("000000000============== in do STar" +file);
    //    System.out.println("------- in do Star ------" + jsonObject.getString("userid") +jsonObject.getString("fileName") +jsonObject.getString("isStar") );

   //     System.out.println("returning from call");
        return new ResponseEntity( fileService.doStar(file),HttpStatus.OK);
    }

    @PostMapping(path = "/doUnStar", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> doUnStar(@RequestBody String file) {
          JSONObject jsonObject = new JSONObject(file);
          //System.out.println("000000000============== in do un STar" +file);
          //System.out.println("------- in do Un Star ------" + jsonObject.getString("userid") +jsonObject.getString("fileName") +jsonObject.getString("isStar") );

       // System.out.println("------- in do UnStar ------" + file);

        return new ResponseEntity(fileService.doUnStar(jsonObject.getInt("userid"),jsonObject.getString("fileName")), HttpStatus.CREATED);
    }


    @PostMapping(path = "/getStarredFiles", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getStarredFiles(@RequestBody String file) {
        //JSONObject jsonObject = new JSONObject(file);
        System.out.println("In getStarredfiles" + file);

        JSONObject jsonObject = new JSONObject(file);
        return new ResponseEntity(fileService.getStarredFiles(jsonObject), HttpStatus.OK);
    }

    @PostMapping(path = "/share", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> shareFile(@RequestBody String fileData) {

        System.out.println("shareFile:" + fileData);
        JSONObject shareFileServiceReturnValues = fileService.shareFile(fileData);
        ///////////////////////////////////////////////////////////////////////
        try {
            System.out.println("Start Saving User Activity");
            JSONObject requestBody = new JSONObject(fileData);
            String activityName = "FileShare";
            Integer userid = requestBody.getInt("userid");
            userActivityService.logActivity(activityName, userid);
        } catch (JSONException jsonException) {
            jsonException.printStackTrace();
        } catch (Exception exception) {
            exception.printStackTrace();
        } finally {
            System.out.println("End Saving User Activity");
        }
        ///////////////////////////////////////////////////////////////////////
        return new ResponseEntity(shareFileServiceReturnValues.getString("message"), (HttpStatus) shareFileServiceReturnValues.get("httpStatus"));
    }


}