import {useEffect, useState,useContext} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Context as AuthContext} from '../context/AuthContext';

const Page = () => {
	const router=useRouter();
	const {makePublisher}=useContext(AuthContext);
    const {session_id,p}=router.query;
	const [transactionId, setTransactionId] = useState("");
	const [plan,setPlan]=useState('');

	const fetcher = (url) =>
		axios.get(url).then((res) => {
			/* console.log(res.data) */
			let el;
			switch(p){
				case process.env.NEXT_PUBLIC_STRIPE_SILVER_PLAN: el="silver";break;
				case process.env.NEXT_PUBLIC_STRIPE_GOLD_PLAN: el="gold";break;
				case process.env.NEXT_PUBLIC_STRIPE_DIAMOND_PLAN: el="diamond";break;
				default: el='';break	
			}
			setPlan(el);
		});
	
	useEffect(()=>{
		if(plan){
			const subscription={
				plan,
				from:new Date()
			}
			makePublisher(subscription)
			router.push('/account/publish')
		}
	},[plan])
	useEffect(() => {
		if (session_id) {
            fetcher(`/api/checkout_sessions/${session_id}`)
			setTransactionId(session_id);
		}
	}, [session_id]);
   
	return <></>;
};

export default Page;
