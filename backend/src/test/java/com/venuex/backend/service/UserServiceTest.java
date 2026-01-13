package com.venuex.backend.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.venuex.backend.entities.Role;
import com.venuex.backend.entities.User;
import com.venuex.backend.repository.RoleRepository;
import com.venuex.backend.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest { //tests per method are organized alphabetically

    @Mock
    UserRepository userRepository;

    @Mock
    RoleRepository roleRepository;

    @Mock 
    PasswordEncoder passwordEncoder;

    @InjectMocks
    UserService userService;

    private static User user;
    private static Role role;
    private static Set<Role> roles = new HashSet<>();

    @BeforeEach
    void setup(){

        role = new Role(1, "USER");
        roles.add(role);

        user = new User();
        user.setId(1);
        user.setEmail("umathurman@gmail.com");
        user.setPasswordHash("password");
        user.setFirstName("Uma");
        user.setLastName("Thurman");
        user.setPhone("(123)-456-7890");
        user.setRoles(roles);
    }

    @Test
    void createUser_Success_ReturnUser() {
        when(userRepository.save(user)).thenReturn(user);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(roleRepository.findByRoleName("USER")).thenReturn(Optional.of(role));

        User createdUser = userService.createUser(user);

        assertNotNull(createdUser);
        assertSame(user, createdUser);

        verify(passwordEncoder).encode("password");
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void createUser_Failure_EmailInUse() {
        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> userService.createUser(user));

        assertEquals("Email already in use", exception.getMessage());

        verify(userRepository, times(1)).existsByEmail(user.getEmail());
        verify(userRepository, never()).save(any());
    }

    @Test
    void createUser_Failure_UserRoleNotFound() {
        when(roleRepository.findByRoleName("USER")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> userService.createUser(user));

        assertEquals("USER role not found", exception.getMessage());

        verify(roleRepository, times(1)).findByRoleName("USER");
        verify(userRepository, never()).save(any());
    }

    @Test
    void deleteUser_Success_ReturnVoid() {
        when(userRepository.existsById(user.getId())).thenReturn(true);
        doNothing().when(userRepository).deleteById(user.getId());

        userService.deleteUser(user.getId());

        verify(userRepository, times(1)).existsById(user.getId());
        verify(userRepository, times(1)).deleteById(user.getId());
    }

    @Test
    void deleteUser_Failure_UserNotFound() {
        when(userRepository.existsById(user.getId())).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> userService.deleteUser(user.getId()));

        assertEquals("User not found", exception.getMessage());

        verify(userRepository, times(1)).existsById(user.getId());
        verify(userRepository, never()).delete(user);
    }

    @Test
    void getAllUsers_Success_ReturnUsers() {
        List<User> users = List.of(user);
        when(userRepository.findAll()).thenReturn(users);
        
        List<User> result = userService.getAllUsers();

        assertEquals(1, result.size());
        assertSame(user, result.get(0));
        
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getAllUsers_Failure_ReturnEmpty() {
        List<User> users = List.of();
        when(userRepository.findAll()).thenReturn(users);
        
        List<User> result = userService.getAllUsers();

        assertEquals(0, result.size());
        
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getUserById_Success_ReturnUser() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

        User result = userService.getUserById(user.getId());

        assertSame(user, result);
        
        verify(userRepository, times(1)).findById(user.getId());
    }

    @Test
    void getUserById_Failure_NotFound() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
            () -> userService.getUserById(user.getId()));

        assertEquals("User not found", exception.getMessage());
        
        verify(userRepository, times(1)).findById(user.getId());
    }

    @Test
    void updatePassword_Success_ReturnVoid() {

        String oldPasswordHash = user.getPasswordHash();

        when(passwordEncoder.encode("updated")).thenReturn("encodedUpdated");
        when(userRepository.save(user)).thenReturn(user);
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

        userService.updatePassword(1, "updated");

        assertNotEquals(oldPasswordHash, user.getPasswordHash());

        verify(passwordEncoder, times(1)).encode("updated");
        verify(userRepository, times(1)).save(user);
        verify(userRepository, times(1)).findById(user.getId());
    }

    @Test // NOTE: I'm assuming that updateUser() is not intended to update the password
    void updateUser_Success_ReturnUser() {
        User oldUser = user;

        User updatedUser = new User();
        updatedUser.setId(1);
        updatedUser.setEmail("ethanhawke97@yahoo.com");
        updatedUser.setPasswordHash("password2");
        updatedUser.setFirstName("Ethan");
        updatedUser.setLastName("Hawke");
        updatedUser.setPhone("(987)-654-3210");
        updatedUser.setRoles(roles);

        when(userRepository.findById(oldUser.getId())).thenReturn(Optional.of(oldUser));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User result = userService.updateUser(oldUser.getId(), updatedUser);

        assertEquals("ethanhawke97@yahoo.com", result.getEmail());
        assertEquals("Ethan", result.getFirstName());
        assertEquals("Hawke", result.getLastName());
        assertEquals("(987)-654-3210", result.getPhone());
        assertEquals(updatedUser.getRoles(), result.getRoles());

        assertEquals(oldUser.getPasswordHash(), result.getPasswordHash());
        assertNotEquals(updatedUser.getPasswordHash(), result.getPasswordHash());

        verify(userRepository, times(1)).save(any(User.class));
        verify(userRepository, times(1)).findById(updatedUser.getId());
    }
}
