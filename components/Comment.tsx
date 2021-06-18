import React from "react";

interface MyProps {
    items: Map<string, any>;
}

interface MyState {

}

export class Comment extends React.Component<MyProps, MyState> {
    constructor(props) {
        super(props);   
    }

    render() {
        const averageGradeByReviews = this.props.items ? this.props.items.reduce((acc, curr) => acc + curr.get('mark'), 0) / this.props.items.size : 0;

        const averageGradeMarkers = Array.from([1,2,3,4,5])
            .map(i => {
                const color = i <= averageGradeByReviews ? 'green' : 'gray';
                return <svg key={'grade_svg_' + i} className={`h-5 w-5 fill-current text-${color}-500`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" /></svg>;
            }); 
        
        let reviewsCount = null;    
        if (this.props.items?.size > 1) {
            reviewsCount = <span className="ml-2">{this.props.items?.size} reviews</span>
        }

        return (
            <div className="text-sm text-gray-600 mt-2 flex items-center">
                {averageGradeMarkers}
                {reviewsCount}
            </div>
        );
    }
}