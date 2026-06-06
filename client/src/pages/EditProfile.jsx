import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";

const stepDefinitions = [
  {
    title: "Basic Info",
    description: "Start with the essentials. Simple and accurate is enough.",
    fields: ["fullName", "dateOfBirth", "gender", "phone"]
  },
  {
    title: "Religious Info",
    description: "Add the identity markers many Indian families usually ask about.",
    fields: ["religion", "caste", "gotra", "motherTongue"]
  },
  {
    title: "Location",
    description: "Help people understand where you are currently based.",
    fields: ["city", "state"]
  },
  {
    title: "Education & Career",
    description: "Clear education and profession details make profiles feel more complete.",
    fields: ["education", "profession", "annualIncome"]
  },
  {
    title: "About Me",
    description: "This is where warmth matters. Keep it real, clear, and kind.",
    fields: ["bio", "height", "maritalStatus"]
  },
  {
    title: "Family & Lifestyle",
    description: "Help families understand your background, values, and daily life.",
    fields: ["diet", "familyType", "familyValues", "parentsOccupation", "siblings"]
  },
  {
    title: "Horoscope",
    description: "Optional — store birth details now for kundli matching later. Nothing here is required.",
    fields: ["manglikStatus", "birthTime", "birthPlace"]
  },
  {
    title: "Photos",
    description: "Good photos create trust quickly. Keep them simple and natural.",
    fields: []
  }
];

const fieldMeta = {
  fullName: { label: "Full Name", type: "text" },
  dateOfBirth: { label: "Date of Birth", type: "date" },
  gender: {
    label: "Gender",
    type: "select",
    options: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "other", label: "Other" }
    ]
  },
  phone: { label: "Phone Number", type: "text" },
  religion: { label: "Religion", type: "text", placeholder: "e.g. Hindu, Muslim, Sikh, Christian, Jain…" },
  caste: { label: "Caste / Community", type: "text" },
  gotra: { label: "Gotra", type: "text" },
  motherTongue: { label: "Mother Tongue", type: "text", placeholder: "e.g. Hindi, Marathi, Tamil…" },
  city: { label: "City", type: "text" },
  state: { label: "State", type: "text" },
  education: { label: "Education", type: "text", placeholder: "e.g. B.Tech, MBA, MBBS…" },
  profession: { label: "Profession", type: "text", placeholder: "e.g. Software Engineer, Doctor…" },
  annualIncome: { label: "Annual Income", type: "text", placeholder: "e.g. 8–10 LPA (optional)" },
  bio: {
    label: "About Me",
    type: "textarea",
    placeholder: "Share your personality, family values, and what kind of life partner you are hoping to meet."
  },
  height: { label: "Height", type: "text", placeholder: "e.g. 5'7\" or 170 cm" },
  maritalStatus: {
    label: "Marital Status",
    type: "select",
    options: [
      { value: "", label: "Not specified" },
      { value: "never married", label: "Never Married" },
      { value: "divorced", label: "Divorced" },
      { value: "widowed", label: "Widowed" },
      { value: "awaiting divorce", label: "Awaiting Divorce" }
    ]
  },
  diet: {
    label: "Diet Preference",
    type: "select",
    options: [
      { value: "", label: "Not specified" },
      { value: "veg", label: "Vegetarian" },
      { value: "non-veg", label: "Non-Vegetarian" },
      { value: "eggetarian", label: "Eggetarian" },
      { value: "vegan", label: "Vegan" }
    ]
  },
  familyType: {
    label: "Family Type",
    type: "select",
    options: [
      { value: "", label: "Not specified" },
      { value: "nuclear", label: "Nuclear Family" },
      { value: "joint", label: "Joint Family" }
    ]
  },
  familyValues: {
    label: "Family Values",
    type: "select",
    options: [
      { value: "", label: "Not specified" },
      { value: "traditional", label: "Traditional" },
      { value: "moderate", label: "Moderate" },
      { value: "liberal", label: "Liberal" }
    ]
  },
  parentsOccupation: {
    label: "Parents' Occupation",
    type: "text",
    placeholder: "e.g. Retired government officer"
  },
  siblings: {
    label: "Siblings",
    type: "text",
    placeholder: "e.g. 1 brother, 2 sisters"
  },
  manglikStatus: {
    label: "Manglik Status",
    type: "select",
    options: [
      { value: "", label: "Not specified" },
      { value: "manglik", label: "Manglik" },
      { value: "non-manglik", label: "Non-Manglik" },
      { value: "dont know", label: "Don't Know" }
    ]
  },
  birthTime: {
    label: "Birth Time",
    type: "text",
    placeholder: "e.g. 10:30 AM"
  },
  birthPlace: {
    label: "Birth Place",
    type: "text",
    placeholder: "City or town of birth"
  }
};

const EditProfile = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [photoSubmitting, setPhotoSubmitting] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    dateOfBirth: user?.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
    gender: user?.gender || "female",
    phone: user?.phone || "",
    religion: user?.religion || "",
    caste: user?.caste || "",
    gotra: user?.gotra || "",
    motherTongue: user?.motherTongue || "",
    city: user?.city || "",
    state: user?.state || "",
    education: user?.education || "",
    profession: user?.profession || "",
    annualIncome: user?.annualIncome || "",
    bio: user?.bio || "",
    height: user?.height || "",
    maritalStatus: user?.maritalStatus || "",
    diet: user?.diet || "",
    familyType: user?.familyType || "",
    familyValues: user?.familyValues || "",
    parentsOccupation: user?.parentsOccupation || "",
    siblings: user?.siblings || "",
    manglikStatus: user?.manglikStatus || "",
    birthTime: user?.birthTime || "",
    birthPlace: user?.birthPlace || ""
  });

  const currentStep = useMemo(() => stepDefinitions[step], [step]);
  const filledFields = useMemo(() => Object.values(formData).filter(Boolean).length, [formData]);
  const profileStrength = Math.round((filledFields / Object.keys(formData).length) * 100);

  const handleSaveDetails = async () => {
    try {
      setSubmitting(true);
      await api.put("/profile/update", formData);
      await refreshUser();
      toast.success("Profile details saved.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save profile details.");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadPhotos = async () => {
    if (!profilePhoto && !galleryPhotos.length) {
      return true;
    }

    try {
      setPhotoSubmitting(true);
      const data = new FormData();
      if (profilePhoto) data.append("profilePhoto", profilePhoto);
      Array.from(galleryPhotos).forEach((file) => data.append("photos", file));
      await api.post("/profile/upload-photo", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      await refreshUser();
      toast.success("Photos uploaded.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Photo upload failed.");
      return false;
    } finally {
      setPhotoSubmitting(false);
    }
  };

  const handleContinue = async () => {
    if (step < stepDefinitions.length - 1) {
      const saved = await handleSaveDetails();
      if (saved) setStep((value) => value + 1);
      return;
    }

    const saved = await handleSaveDetails();
    if (!saved) return;
    const uploaded = await handleUploadPhotos();
    if (uploaded) {
      // New / unpaid users go to the membership page as the final step.
      // Paid members who edit their profile return to their profile page.
      navigate(user?.isPaid ? "/profile" : "/membership");
    }
  };

  return (
    <section className="page-shell">
      <div className="builder-layout">
        <aside className="builder-panel">
          <div>
            <span className="eyebrow">Profile Builder</span>
            <h1>Build a profile people can understand and trust.</h1>
            <p className="muted-copy">
              Keep the wording simple and clear — that's enough. You can always refine details later.
            </p>
          </div>

          <div className="builder-progress">
            <strong>Profile strength</strong>
            <div className="progress-bar">
              <div style={{ width: `${profileStrength}%` }} />
            </div>
            <span className="muted-copy">{profileStrength}% of the main fields are filled.</span>
          </div>

          <div className="stepper">
            {stepDefinitions.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`step-pill ${index === step ? "active" : ""}`}
                onClick={() => setStep(index)}
              >
                <strong>
                  Step {index + 1}: {item.title}
                </strong>
                <small>{item.description}</small>
              </button>
            ))}
          </div>

          <div className="helper-card">
            <strong>Quick tip</strong>
            <p>
              The strongest profiles usually have a good photo, a warm bio, and honest details. No need for
              extra polish — just sincerity.
            </p>
          </div>
        </aside>

        <div className="builder-card">
          <div className="builder-header">
            <span className="eyebrow">Step {step + 1} of {stepDefinitions.length}</span>
            <h2>{currentStep.title}</h2>
            <p className="muted-copy">{currentStep.description}</p>
          </div>

          {step === stepDefinitions.length - 1 ? (
            <div className="upload-panel">
              <div className="field-stack">
                <span>Profile Photo</span>
                <small>Use a clear, recent photo. Natural lighting works best.</small>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setProfilePhoto(file);
                    setProfilePhotoPreview(file ? URL.createObjectURL(file) : null);
                  }}
                />
                {profilePhotoPreview && (
                  <img
                    src={profilePhotoPreview}
                    alt="Profile preview"
                    style={{ width: 120, height: 140, objectFit: "cover", borderRadius: 20, marginTop: 8 }}
                  />
                )}
              </div>

              <div className="field-stack">
                <span>Gallery Photos</span>
                <small>Add a few more photos if you want your profile to feel fuller and more genuine.</small>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    const files = event.target.files;
                    setGalleryPhotos(files);
                    setGalleryPreviews(Array.from(files).map((f) => URL.createObjectURL(f)));
                  }}
                />
                {galleryPreviews.length > 0 && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                    {galleryPreviews.map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt="Gallery preview"
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 14 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button type="button" className="secondary-button" onClick={handleUploadPhotos} disabled={photoSubmitting}>
                {photoSubmitting ? "Uploading..." : "Upload Photos"}
              </button>
            </div>
          ) : (
            <FormSection formData={formData} setFormData={setFormData} fields={currentStep.fields} />
          )}

          <div className="wizard-actions">
            <button type="button" className="ghost-button" onClick={() => setStep((value) => Math.max(0, value - 1))}>
              Back
            </button>

            <button type="button" className="primary-button" onClick={handleContinue} disabled={submitting || photoSubmitting}>
              {step === stepDefinitions.length - 1 ? "Finish Profile" : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormSection = ({ formData, setFormData, fields }) => (
  <div className="form-grid">
    {fields.map((field) => {
      const config = fieldMeta[field];

      if (config.type === "select") {
        return (
          <label key={field} className="field-stack">
            <span>{config.label}</span>
            <select value={formData[field]} onChange={(event) => setFormData({ ...formData, [field]: event.target.value })}>
              {config.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        );
      }

      if (config.type === "textarea") {
        return (
          <label key={field} className="field-stack" style={{ gridColumn: "1 / -1" }}>
            <span>{config.label}</span>
            <textarea
              rows="5"
              placeholder={config.placeholder || config.label}
              value={formData[field]}
              onChange={(event) => setFormData({ ...formData, [field]: event.target.value })}
            />
          </label>
        );
      }

      return (
        <label key={field} className="field-stack">
          <span>{config.label}</span>
          <input
            type={config.type}
            placeholder={config.placeholder || config.label}
            value={formData[field]}
            onChange={(event) => setFormData({ ...formData, [field]: event.target.value })}
          />
        </label>
      );
    })}
  </div>
);

export default EditProfile;
