import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <div>
      <li className="categoryListing">
        <Link
          to={`/category/${listing.location}/${id}`}
          className="categoryListingLink"
        >
          <img
            src={listing.imgUrls[0]}
            alt={listing.name}
            className="categoryListingImg"
          />
          <div className="categoryListingDetails">
            <p className="categoryListingLocation">{listing.address}</p>
            <p className="categoryListingName">{listing.name}</p><br />
            {listing.discount && <p className="categoryListingPrice">{listing.discount}</p>}
            
            {/* <p className="categoryListingPrice">
              $
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" && "/Month"}
            </p> */}

            <div className="categoryListingInfoDiv">
              <img src={bedIcon} alt="bed" />
              <p className="categoryListingInfoText">
                {listing.homeDel ? "Avaliable" : "Not Avaliable"}
              </p>

              <img src={bathtubIcon} alt="bathtub" />
              <p className="categoryListingInfoText">
                {listing.contact}
              </p>
            </div>
          </div>
        </Link>

        {onDelete && (
          <DeleteIcon
            className="removeIcon"
            fill="rgb(231, 76, 60)"
            onClick={() => onDelete(listing.id, listing.name)}
          />
        )}

        {onEdit && <EditIcon className="editIcon" onClick={() => onEdit(id)} />}
      </li>
    </div>
  );
};

export default ListingItem;
