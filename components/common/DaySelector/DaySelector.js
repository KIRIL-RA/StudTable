import { useDispatch, useSelector } from "react-redux"
import { setSelectedDay } from "../../../actions/actions";
const DaySelector = () => {
    const dispatch = useDispatch();
    const {selectedDay} = useSelector(state => state.reducer)
    const changeDay = (event) => dispatch(setSelectedDay(event.target.value))
    return(
        <select value={selectedDay} onChange={changeDay}>
            <option value="">Выберите день недели</option>
            <option value="Monday">Понедельник</option>
            <option value="Tuesday">Вторник</option>
            <option value="Wednesday">Среда</option>
            <option value="Thursday">Четверг</option>
            <option value="Friday">Пятница</option>
            <option value="Saturday">Суббота</option>
            <option value="Sunday">Воскресенье</option>
        </select>
    )
}

export default DaySelector;