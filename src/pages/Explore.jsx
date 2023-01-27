import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import kankadbaghimg from "../assets/jpg/kankadbaghimg.jpg";
import kadamkuan from "../assets/jpg/kadamkuan.jpg";
import Slider from "../components/Slider";

const Explore = () => {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        <Slider />

        <p className="exploreCategoryHeading">Categories</p>

        <div className="exploreCategories">
          <Link to="/category/bailey-road">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <div className="exploreCategoryName">Mess in Bailey Road</div>
          </Link>
          <Link to="/category/boring-road">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            />
            <div className="exploreCategoryName">Mess in Boring Road</div>
          </Link>
          <Link to="/category/kankadbagh">
            <img
              src={kankadbaghimg}
              alt="sell"
              className="exploreCategoryImg"
            />
            <div className="exploreCategoryName">Mess in kankadbagh</div>
          </Link>
          <Link to="/category/kadamkuan">
            <img
              src={kadamkuan}
              alt="sell"
              className="exploreCategoryImg"
            />
            <div className="exploreCategoryName">Mess in kadamkuan</div>
          </Link>
  
            
        </div>
      </main>
    </div>
  );
};

export default Explore;
