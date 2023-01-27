import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const CreateListing = () => {
  // eslint-disable-next-line
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "boring-road",
    name: "",
    // bedrooms: 1,
    // bathrooms: 1,
    contact:"",
    homeDel: false,
    address: "",
    offer: false,
    price: 0,
    discount: 0,
    menu: "",
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    location,
    name,
    // bedrooms,
    // bathrooms,
    homeDel,
    contact,
    address,
    offer,
    price,
    menu,
    discount,
    images,
    latitude,
    longitude,
  } = formData;

  const params = useParams()

  const auth = getAuth();
  const navigate = useNavigate();

  //In case of memory leaks.
  const isMounted = useRef(true);

   //Fetch listing to edit
   useEffect(() => {
    setLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data(), address: docSnap.data().address });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("listing doesn't exists");
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => (isMounted.current = false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (loading) {
    <Spinner />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    // if (discount >= price) {
    //   setLoading(false);
    //   toast.error("Discounted price needs to be less than regular price");
    //   return;
    // }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Max 6 images");
      return;
    }

    let geolocation = {};

    if (geolocationEnabled) {
      // Call the api from here, when enabled :(
      //Enable geocoding api key from google cloud console, and await the response from here.
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;

      // console.log(geolocation, location);
    }

    //Store Image in firebase (get this from documentation)
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };

    formDataCopy.address = address;
    delete formDataCopy.images;
    // delete formDataCopy.address;
    !formDataCopy.offer && delete formDataCopy.discount;

    const docRef = await doc(db, "listings", params.listingId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing Saved");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }

    if (e.target.value === "false") {
      boolean = false;
    }

    //Files
    if (e.target.files) {
      setFormData((prevState) => ({ ...prevState, images: e.target.files }));
    }

    //Text/Booleans/Numbers

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Edit Listing</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label className="formLabel">Location</label>
          <div className="formButtons">
            <button
              type="button"
              className={location === "bailey-road" ? "formButtonActive" : "formButton"}
              id="location"
              value="bailey-road"
              onClick={onMutate}
            >
              Bailey Road
            </button>
            <button
              type="button"
              className={location === "boring-road" ? "formButtonActive" : "formButton"}
              id="location"
              value="boring-road"
              onClick={onMutate}
            >
              Boring Road
            </button>
            <button
              type="button"
              className={location === "kankadbagh" ? "formButtonActive" : "formButton"}
              id="location"
              value="kankadbagh"
              onClick={onMutate}
            >
              Kankadbagh
            </button>
            <button
              type="button"
              className={location === "kadamkuan" ? "formButtonActive" : "formButton"}
              id="location"
              value="kadamkuan"
              onClick={onMutate}
            >
              Kadamkuan
            </button>
          </div>

          <label className="formLabel">Name</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            value={name}
            onChange={onMutate}
            maxLength="32"
            minLength="10"
            required
          />

          <label className="formLabel">Contact</label>
          <input
            className="formInputName"
            type="text"
            id="contact"
            value={contact}
            onChange={onMutate}
            maxLength="32"
            minLength="10"
            required
          />

          {/* <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
            <div>
              <label className="formLabel">Bathrooms</label>
              <input
                className="formInputSmall"
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onMutate}
                min="1"
                max="50"
                required
              />
            </div>
          </div> */}

          <label className="formLabel">Home Delivery?</label>
          <div className="formButtons">
            <button
              className={homeDel ? "formButtonActive" : "formButton"}
              type="button"
              id="homeDel"
              value={true}
              onClick={onMutate}
              min="1"
              max="50"
            >
              Yes
            </button>
            <button
              className={
                !homeDel && homeDel !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="homeDel"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          {/* <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              className={furnished ? "formButtonActive" : "formButton"}
              type="button"
              id="furnished"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              id="furnished"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div> */}

          <label className="formLabel">Address</label>
          <textarea
            className="formInputAddress"
            type="text"
            id="address"
            value={address}
            onChange={onMutate}
            required
          />

          {!geolocationEnabled && (
            <div className="formLatLng flex">
              <div>
                <label className="formLabel">Latitude</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className="formLabel">Longitude</label>
                <input
                  className="formInputSmall"
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}

          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              className={offer ? "formButtonActive" : "formButton"}
              type="button"
              id="offer"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="offer"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Price</label>
          <div className="formPriceDiv">
            <input
              className="formInputSmall"
              type="number"
              id="price"
              value={price}
              onChange={onMutate}
              min="50"
              max="750000000"
              required
            />
            {/* {type === "rent" && <p className="formPriceText">$ / Month</p>} */}
          </div>

          {offer && (
            <>
              <label className="formLabel">Discounted</label>
              <input
                className="formInputSmall"
                type="number"
                id="discount"
                value={discount}
                onChange={onMutate}
                min="2"
                max="50"
                required={offer}
              />
            </>
          )}

<label className="formLabel">{`Menu (Link)`}</label>
          <input
            className="formInputName"
            type="text"
            id="menu"
            value={menu}
            onChange={onMutate}
            required
          />

          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The first image will be the cover (max 6).
          </p>
          <input
            className="formInputFile"
            type="file"
            id="images"
            onChange={onMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <button type="submit" className="primaryButton createListingButton">
            Update Listing
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;