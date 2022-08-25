import inputStyle from '../../sing_up/singUp.module.css'
import styles from '../../sing_up/singUp.module.css'
import container from '../../../components/LayOut/LayOut.module.css'
import accStyle from './accumulation.module.css'
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {IBonuses} from "../../../interfaces";

const Accumulation = () => {
    const bonuses=useSelector<RootState,IBonuses>(state => state.infoUser.info?.bonuses as IBonuses)

    const validDate = () => {
        const date=new Date()
        let day:string|number=date.getUTCDate()
        let month:string|number=date.getUTCMonth()+1
        if(day<=9){
            day=`0${day}`
        }
        if(month<=9){
            month=`0${month}`
        }
        return`${day}.${month}.${date.getUTCFullYear()}`
    }

    const getCorrectMin = () => {
        const min=new Date().getMinutes()
      if(min<=9) return `0${min}`
        return min
    }

    const getCorrectHours = () => {
        const hours=new Date().getHours()
        if(hours<=9) return `0${hours}`
        return hours
    }

    const date=validDate()
    const time=`${getCorrectHours()}:${getCorrectMin()}`

    return (
        <div className={`${container.container} ${accStyle.flex}`}>
            <div className={accStyle.description}>Ваши накопления на <br/> {date} г.,{time}</div>
            <div className={styles.form_body}>
                <div className={inputStyle.form__item} >
                    <input  className={`${styles.input_data} ${accStyle.input}`} value={`Бонусы: ${bonuses?.bonus??0}`} readOnly/>
                </div>
                <div className={inputStyle.form__item} aria-readonly={true}>
                    <input className={`${styles.input_data} ${accStyle.input}`} value={`Баллы: ${bonuses?.points??0}`} readOnly/>
                </div>
                <div className={inputStyle.form__item} aria-readonly={true}>
                    <input className={`${styles.input_data} ${accStyle.input}`} value={`Счёт: ${bonuses?.check??0} р.`} readOnly/>
                </div>
                <div className={inputStyle.form__item} aria-readonly={true}>
                    <input className={`${styles.input_data} ${accStyle.input}`} value={`Сумма покупок: ${bonuses?.sum??0} р.`} readOnly/>
                </div>
            </div>
        </div>
    )
}
export default Accumulation
