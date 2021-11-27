import { useEffect , useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";

const PortfolioForm = ({onSubmit , initialData = {}}) => {
  console.log("----initialData---",initialData);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { handleSubmit, register ,setValue} = useForm({defaultValues:initialData});

  useEffect(() => {
    const { startDate,endDate} = initialData;
    if (startDate){
      let sDate = new Date(parseInt(startDate))
      setValue('startDate',sDate)
      setStartDate(sDate);
    }
    if (endDate){
      let eDate = new Date(parseInt(endDate))
      setEndDate(eDate);
      setValue('endDate',eDate)
    }
  }, [initialData]);

  const handleDateChange = (dateType, setDate) => date => {
      setValue(dateType, date.toISOString());
      if (dateType == "startDate"){
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          {...register("title")}
          name="title"
          type="text"
          className="form-control"
          id="title"/>
      </div>

      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
           {...register("company")}
          name="company"
          type="text"
          className="form-control"
          id="company"/>
      </div>

      <div className="form-group">
        <label htmlFor="city">Company Website</label>
        <input
           {...register("companyWebsite")}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"/>
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
           {...register("location")}
          name="location"
          type="text"
          className="form-control"
          id="location"/>
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
           {...register("jobTitle")}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"/>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
           {...register("description")}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description">
        </textarea>
      </div>

      <div className="form-group">
        <label htmlFor="street">Start Date</label>
        <div>
            <DatePicker 
                showYearDropdown
                selected={startDate}
                onChange={handleDateChange('startDate',setStartDate)}
            />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="street">End Date</label>
        <div>
            <DatePicker 
                showYearDropdown
                selected={endDate}
                onChange={handleDateChange('endDate',setEndDate)}
            />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary">Create
      </button>
    </form>
  )
}

export default PortfolioForm;