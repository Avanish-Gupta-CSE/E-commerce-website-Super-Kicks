import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useAddressContext } from "../../contexts/AddressProvider";
import { toast } from "react-toastify";
import "./Profile.css";

export const Profile = () => {
  const { profile, updateProfile, user } = useAuth();
  const { addressData, deleteHandler } = useAddressContext();

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [lastName, setLastName] = useState(profile?.lastName || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!firstName.trim()) {
      toast.warn("First name is required");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ firstName: firstName.trim(), lastName: lastName.trim() });
      setEditing(false);
    } catch {
      // toast handled in AuthProvider
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>My Account</h1>

      <section className="profile-section">
        <h2>Account Information</h2>
        {editing ? (
          <div className="profile-edit-form">
            <div className="input-group">
              <label htmlFor="profile-firstname">First Name</label>
              <input
                id="profile-firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="profile-lastname">Last Name</label>
              <input
                id="profile-lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="profile-edit-actions">
              <button
                className="button"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="button button-secondary"
                onClick={() => {
                  setEditing(false);
                  setFirstName(profile?.firstName || "");
                  setLastName(profile?.lastName || "");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <p>
              <strong>Name:</strong>{" "}
              {profile?.firstName} {profile?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Member since:</strong>{" "}
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
            <button
              className="button"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </section>

      <section className="profile-section">
        <h2>Order History</h2>
        <p>View all your past orders and track their status.</p>
        <Link className="button" to="/orders">
          View Orders
        </Link>
      </section>

      <section className="profile-section">
        <h2>Saved Addresses</h2>
        {addressData.length === 0 ? (
          <p>No saved addresses.</p>
        ) : (
          <ul className="profile-addresses">
            {addressData.map((addr) => (
              <li key={addr.id} className="profile-address-card">
                <div>
                  <strong>{addr.name}</strong>
                  <p>
                    {addr.address}, {addr.city}, {addr.pinCode}
                  </p>
                  <p>Mobile: {addr.mobileNo}</p>
                </div>
                <button
                  className="button button-danger"
                  onClick={() => deleteHandler(addr.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
