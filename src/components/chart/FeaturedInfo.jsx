import './featuredInfo.css';

import { useEffect, useState } from 'react';

import { briefNumbers } from '../../adapter/BriefmsAdapter';

// import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  const [data, setData] = useState({
    total_brief: 0,
    plan_approved: 0,
    pending_brief: 0,
    media_plan_shared: 0,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const response = briefNumbers();
    response.then(function (result) {
      setLoading(false);
      if (result.status === "Success") {
        console.log(result);
        setData({
          ...data,
          total_brief: result.data.total_brief,
          plan_approved: result.data.plan_approved,
          pending_brief: result.data.pending_brief,
          media_plan_shared: result.data.media_plan_shared,
        });
      } else {
      }
    });
  }, []);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total brief</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.total_brief}</span>
          {/* <span className="featuredMoneyRate">90%</span> */}
        </div>
        <span className="featuredSub">This year's total </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Received briefs</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.plan_approved}</span>
          {/* <span className="featuredMoneyRate">+12%</span> */}
        </div>
        <span className="featuredSub">This year's total</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Pending brief</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.pending_brief}</span>
          {/* <span className="featuredMoneyRate">90%</span> */}
        </div>
        <span className="featuredSub">This year's total </span>
      </div>
      {/* <div className="featuredItem">
        <span className="featuredTitle">Paused brief</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.campaign_paused}</span> */}
      {/* <span className="featuredMoneyRate">90%</span> */}
      {/* </div>
        <span className="featuredSub">This year's total </span>
      </div> */}
      <div className="featuredItem">
        <span className="featuredTitle">Media plan uploaded</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {data.media_plan_shared + data.plan_approved}
          </span>
          {/* <span className="featuredMoneyRate">90%</span> */}
        </div>
        <span className="featuredSub">This year's total </span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Media plan Approved</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.plan_approved}</span>
          {/* <span className="featuredMoneyRate">90%</span> */}
        </div>
        <span className="featuredSub">This year's total </span>
      </div>
    </div>
  );
}
