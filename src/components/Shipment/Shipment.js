import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import './Shipment.css';

const Shipment = () => {

  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();
  const { displayName, email } = auth.user;
  const onSubmit = data => console.log(data);

  return (

    <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>

      <input name="name" defaultValue={displayName} ref={register({ required: true })} placeholder="Your Name" />
      {errors.name && <span className="error">Name field is required</span>}

      <input name="email" defaultValue={email} ref={register({ required: true })} placeholder="Your Email" />
      {errors.email && <span className="error">Email field is required</span>}

      <input name="phoneNumber" ref={register({ required: true })} placeholder="Your Phone Number"/>
      {errors.phoneNumber && <span className="error">Phone Number is required</span>}

      <input name="AddressLine1" ref={register({ required: true })} placeholder="Address line 1"/>
      {errors.AddressLine1 && <span className="error">Address Line 1 field is required</span>}

      <input name="AddressLine2" ref={register} placeholder="Address line 2" />

      <input name="country" ref={register({ required: true })} placeholder="Country"/>
      {errors.country && <span className="error">Country field is required</span>}

      <input name="city" ref={register({ required: true })} placeholder="City"/>
      {errors.city && <span className="error">City field is required</span>}
      
      <input type="submit" />

    </form>
  );
};

export default Shipment;