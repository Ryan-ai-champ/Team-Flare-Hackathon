import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Avatar, 
  Grid,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import UploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector, useDispatch } from 'react-redux';
// Import user actions from Redux store (assuming they exist)
// import { updateUserProfile, fetchUserProfile } from '../redux/slices/userSlice';

// Styled components
const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ProfilePage = () => {
  // Mock user data - replace with Redux state in production
  const [user, setUser] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    language: 'English',
    timezone: 'America/New_York',
    profession: 'Software Engineer',
    birthDate: '1990-01-01',
    profilePicture: 'https://via.placeholder.com/150',
    userType: 'client' // client, lawyer, admin, etc.
  });

  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [editableUser, setEditableUser] = useState({ ...user });
  
  // Redux hooks
  const dispatch = useDispatch();
  // Uncomment when Redux store is available
  // const { user, loading, error } = useSelector(state => state.user);
  
  // Fetch user profile on component mount
  useEffect(() => {
    // In a real application, fetch user data from backend
    // dispatch(fetchUserProfile());
    
    // For demo, we're using the mock data
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // If we're canceling, revert changes
      setEditableUser({ ...user });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value,
    });
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real application, upload to server and get URL
      // For demo, we're using a local file reader
      const reader = new FileReader();
      reader.onload = () => {
        setEditableUser({
          ...editableUser,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    
    try {
      // In a real application, save changes to backend
      // await dispatch(updateUserProfile(editableUser));
      
      // For demo, we're just updating the local state
      setTimeout(() => {
        setUser({ ...editableUser });
        setIsEditing(false);
        setLoading(false);
        setAlert({ 
          open: true, 
          message: 'Profile updated successfully!', 
          severity: 'success' 
        });
      }, 1000);
    } catch (error) {
      setAlert({ 
        open: true, 
        message: 'Failed to update profile.', 
        severity: 'error' 
      });
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          {/* Left column - Personal info */}
          <Grid item xs={12} md={4}>
            <ProfilePaper elevation={3}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <LargeAvatar 
                  src={isEditing ? editableUser.profilePicture : user.profilePicture} 
                  alt={`${user.firstName} ${user.lastName}`}
                />
                {isEditing && (
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    sx={{ mb: 2 }}
                  >
                    Upload Photo
                    <VisuallyHiddenInput 
                      type="file" 
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                    />
                  </Button>
                )}
                <Typography variant="h5" gutterBottom>
                  {isEditing ? 
                    `${editableUser.firstName} ${editableUser.lastName}` : 
                    `${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {isEditing ? editableUser.profession : user.profession}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {isEditing ? editableUser.email : user.email}
                </Typography>
                <Box mt={2}>
                  {!isEditing ? (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={handleEditToggle}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box display="flex" gap={1}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<CancelIcon />}
                        onClick={handleEditToggle}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                        onClick={handleSaveChanges}
                        disabled={loading}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </ProfilePaper>
          </Grid>

          {/* Right column - Profile details */}
          <Grid item xs={12} md={8}>
            <ProfilePaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={3}>
                {/* First Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={isEditing ? editableUser.firstName : user.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                    margin="normal"
                  />
                </Grid>
                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={isEditing ? editableUser.lastName : user.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                    margin="normal"
                  />
                </Grid>
                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={isEditing ? editableUser.email : user.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                    margin="normal"
                  />
                </Grid>
                {/* Phone */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={isEditing ? editableUser.phone : user.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                    margin="normal"
                  />
                </Grid>
                {/* Address */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={isEditing ? editableUser.address : user.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                    margin="normal"
                  />
                </Grid>
                {/* Birth Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    value={isEditing ? editableUser.birthDate : user.birthDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                {/* Profession */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Profession"
                    name="profession"
                    value={isEditing ? editableUser.profession : user.profession}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "filled"}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Preferences
                </Typography>
                <Grid container spacing={3}>
                  {/* Language */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal" variant={isEditing ? "outlined" : "filled"}>
                      <InputLabel id="language-label">Preferred Language</InputLabel>
                      <Select
                        labelId="language-label"
                        name="language"
                        value={isEditing ? editableUser.language : user.language}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        label="Preferred Language"
                      >
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Spanish">Spanish</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                        <MenuItem value="Chinese">Chinese</MenuItem>
                        <MenuItem value="Hindi">Hindi</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* Timezone */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal" variant={isEditing ? "outlined" : "filled"}>
                      <InputLabel id="timezone-label">Timezone</InputLabel>
                      <Select
                        labelId="timezone-label"
                        name="timezone"
                        value={isEditing ? editableUser.timezone : user.timezone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        label="Timezone"
                      >
                        <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                        <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                        <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                        <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                        <MenuItem value="Asia/Kolkata">India Standard Time (IST)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </ProfilePaper>

            {/* Additional section for case preferences, notifications settings, etc. */}
            <ProfilePaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal" variant={isEditing ? "outlined" : "filled"}>
                    <InputLabel id="usertype-label">Account Type</InputLabel>
                    <Select
                      labelId="usertype-label"
                      name="userType"
                      value={isEditing ? editableUser.userType : user.userType}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      label="Account Type"
                    >
                      <MenuItem value="client">Client</MenuItem>
                      <MenuItem value="lawyer">Immigration Lawyer</MenuItem>
                      <MenuItem value="paralegal">Paralegal</MenuItem>
                      <MenuItem value="admin">Administrator</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* Password change section would go here */}
              </Grid>
            </ProfilePaper>
          </Grid>
        </Grid>
      </Box>

      {/* Success/Error notification */}
      <Snackbar 
        open={alert.open} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity}
          variant="filled"
        >
          

