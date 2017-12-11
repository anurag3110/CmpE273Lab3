package com.service;

import com.entity.File;
import com.repository.FileRepository;
import org.json.HTTP;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;

    public HttpStatus fileUpload(Object file){
        System.out.println("------- in SERVICE FILE upload"+ file.getClass());
        return HttpStatus.OK;
    }

    public InputStreamResource download(String username, String file, String path) {
        return null;
    }
    public HttpStatus makeDirectory(String fileName, String path) {

        System.out.println("-------------- in user service ----" + fileName + "----------" + path);
        java.io.File file = new java.io.File("/Users/anurag.panchal/Downloads/SpringBootDemoCode/SpringBootDemo/src/files/" + path + "/" + fileName);
        try {
            file.mkdir();
            System.out.println("in user service make directory -----");
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    public HttpStatus deleteDirectory(String fileName, String path) {

        System.out.println("-------------- in user service ----" + fileName + "----------" + path);

        java.io.File file = new java.io.File("/Users/anurag.panchal/Downloads/SpringBootDemoCode/SpringBootDemo/src/files/" + path + "/" + fileName);
        try {
            delete(file);
            return HttpStatus.OK;
        } catch (Exception e) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

    }

    public HttpStatus delete(java.io.File f) throws IOException {
        if (f.isDirectory()) {
            System.out.println("in delete files =-======" + f.getName());
            for (java.io.File c : f.listFiles())
                delete(c);

        }
        if (!f.delete())
            throw new FileNotFoundException("Failed to delete file: " + f);
        else
            return HttpStatus.OK;

    }

    public List<String> getAllFiles(String email) {


        List<String> results = new ArrayList<String>();

        java.io.File[] files = new java.io.File("/Users/anurag.panchal/Downloads/SpringBootDemoCode/SpringBootDemo/src/files/14").listFiles();
        //If this pathname does not denote a directory, then listFiles() returns null.
        for (java.io.File file : files) {
            if (file.isFile()) {
                results.add(file.getName());
                System.out.println(file.getName());

            } else if (file.isDirectory()) {
                results.add(file.getName());
            }
            System.out.println(results);
        }
        return results;
    }

    public File doStar(File newFile) {

        // File file = new File();
        //   file.setFileName(newFile.getString("fileName"));
        //   file.setIsStar(newFile.getString("isStar"));
        //   file.setUserid(newFile.getInt("userid"));

        return fileRepository.save(newFile);
        // System.out.println("return from doStar()");
    }

    public HttpStatus doUnStar(Integer userid, String fileName) {

        System.out.println("-------------- in do unstar user service ----" + fileName + "----------" + userid + "--------");
        fileRepository.deleteFileByUseridAndFileName(userid,fileName);
        return HttpStatus.OK;

    }

    public List<File> getStarredFiles(JSONObject starredFiles) {

        return fileRepository.findByUserid(starredFiles.getInt("userid"));
    }

    public JSONObject shareFile(String fileData) {
        JSONObject fileDataJSON = new JSONObject(fileData);

        String fileName = fileDataJSON.getString("fileName");
        int userid = fileDataJSON.getInt("userid");
        String recipientEmail = fileDataJSON.getString("recipientEmail");

        System.out.println("46 fileName: " + fileName + " userid: " + userid + " recipientEmail: " + recipientEmail);

        String dynamicPathToUserFile = Paths.get("").toAbsolutePath().toString() + "/src/files/" + userid + "/" + fileName;
        JavaMailSender mailSender = new JavaMailSenderImpl();

        ((JavaMailSenderImpl) mailSender).setHost("smtp.gmail.com");
        ((JavaMailSenderImpl) mailSender).setPort(587);

        ((JavaMailSenderImpl) mailSender).setUsername("panchal3110@gmail.com");
        ((JavaMailSenderImpl) mailSender).setPassword("systemfriendlyout");

        Properties emailProperties = ((JavaMailSenderImpl) mailSender).getJavaMailProperties();
        emailProperties.put("mail.transport.protocol", "smtp");
        emailProperties.put("mail.smtp.auth", "true");
        emailProperties.put("mail.smtp.starttls.enable", "true");
//        emailProperties.put("mail.debug", "true");

        ((JavaMailSenderImpl) mailSender).setJavaMailProperties(emailProperties);
        MimeMessage message = mailSender.createMimeMessage();
        // pass 'true' to the constructor to create a multipart message

        JSONObject returnValues = new JSONObject();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(recipientEmail);
            helper.setCc("anurag3110@outlook.com");
            helper.setSubject("DropBoxLab3Testing:FileSharing");
            helper.setText("A file has been shared with you.\nPlease find the attachment.");

            FileSystemResource file = new FileSystemResource(new java.io.File(dynamicPathToUserFile));
            helper.addAttachment(fileName, file);

            mailSender.send(message);
            returnValues.put("message", "Shared Successfully");
            returnValues.put("httpStatus", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            returnValues.put("message", "Unable to Share");
            returnValues.put("httpStatus", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        /////////////////////////////////////


        return returnValues;
    }
}