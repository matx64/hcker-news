import moment from "moment";

const ListItem = (props: any) => {
    const date = moment.unix(props.data.time).fromNow();

    return (
        <div className="my-3">
            <a href={props.data.url} className="font-semibold">
                {props.data.title}
            </a>
            <p className="font-thin text-sm text-violet-500">
                {props.data.score} points ● {date}
            </p>
        </div>
    );
};

export default ListItem;
