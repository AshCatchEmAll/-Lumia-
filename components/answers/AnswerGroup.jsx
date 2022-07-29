import {Answer} from "./Answer";
import AnswerReplies from "./AnswerReplies";



function AnswerGroup({answer}){

    return <div>
            <Answer answer={answer}/>
            <AnswerReplies  answer={answer}/>
        </div>


}


export default AnswerGroup;