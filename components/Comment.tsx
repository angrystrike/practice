import Link from "next/link";
import React from "react";
import Review from 'src/Review';

interface MyProps {
    items: Array<Review>;
}

interface MyState {

}

export class Comment extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);
    }

    render() {
        const averageGradeByReviews = this.props.items.reduce((acc, curr) =>{
            return acc + curr.mark
        }, 0) / this.props.items.length

        let averageGradeMarkers = [];
        for(let i = 1; i <= 5; i++){
            if(i <= averageGradeByReviews){
                averageGradeMarkers.push(<svg key={i} className="h-4 w-4 fill-current text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>)
            }
            else{
                averageGradeMarkers.push(<svg key={i} className="h-4 w-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>)
            }
        }

        return (
            <div className="text-sm text-gray-600 mt-2 flex items-center">
                {averageGradeMarkers}
                <span className="ml-2">{this.props.items.length} reviews</span>
            </div>
        );
    }
}