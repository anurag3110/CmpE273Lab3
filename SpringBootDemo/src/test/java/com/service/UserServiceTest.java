package com.service;

import com.AbstractTest;
import com.entity.User;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.List;

@Transactional
    public class UserServiceTest extends AbstractTest {

        @Autowired
        private UserService userService;


        @Test
        public void testLogin() {

            String email = "anurag.panchal@sjsu.edu";
            String password = "rohana";
            List<User> users = userService.login(email, password);

            Assert.assertTrue("Login Test" , users != null && !users.isEmpty());
        }

    @Test
    public void testAddUser() {
        User user = new User();
        user.setFirstname("Anurag");
        user.setLastname("Panchal");
        user.setEmail("anurag.panchal@sjsu.edu");
        user.setPassword("anurag00");
        user.setContact("6692437348");
        user.setEducation("MS");
        user.setMusic("Eminem");
        user.setShows("BreakingBad");
        user.setSports("F1");
        user.setWork("Infosys");
        List<User> users = userService.addUser(user);

        Assert.assertTrue(users != null && !users.isEmpty() && users.get(0).getEmail().equals(user.getEmail()));
    }

    @Test
    public void testShowProfile() {
        Integer userid = 21;

        List<User> users = userService.showProfile("" + userid);
        Assert.assertEquals(userid.intValue(), ((users != null && !users.isEmpty()) ? users.get(0).getId() : -1));
    }

    @Test
    public void testEditProfile() {
        JSONObject userBeingEdited = new JSONObject();
        userBeingEdited.put("userid", 21);
        userBeingEdited.put("firstname", "Anurag");
        userBeingEdited.put("lastname", "Panchal");
        userBeingEdited.put("email", "anurag3110@outlook.com");
        userBeingEdited.put("password", "anurag00");
        userBeingEdited.put("contact", "6692437348");
        userBeingEdited.put("education", "MS");
        userBeingEdited.put("shows", "GoT");
        userBeingEdited.put("sports", "IceSkating");
        userBeingEdited.put("work", "CapGemini");
        userBeingEdited.put("music", "StephenCurry");

        User editedUser = userService.editProfile(userBeingEdited);
        System.out.println(editedUser.getEmail());
        Assert.assertTrue(editedUser != null && userBeingEdited.getString("email").equals(editedUser.getEmail()));
    }

    @Test
    public void testGetAllUsers() {
        int expectedNoOfUsers = 1;
        Iterable<User> users = userService.getAllUsers();
        Iterator iterator = users.iterator();
        int actualNoOfUsers = 0;
        while(iterator.hasNext()) {
            iterator.next();
            ++actualNoOfUsers;
        }
        Assert.assertEquals(expectedNoOfUsers, actualNoOfUsers);
    }
}
