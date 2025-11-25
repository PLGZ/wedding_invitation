import { RsvpFormData } from '../types';
import { GOOGLE_SCRIPT_URL } from '../constants';

export const submitRsvpToGoogleSheet = async (data: RsvpFormData): Promise<boolean> => {
  try {
    // Google Apps Script Web Apps generally accept form-urlencoded data best for simple POSTs
    // independent of strict CORS configurations.
    const formBody = new URLSearchParams();
    formBody.append('name', data.name);
    formBody.append('phone', data.phone);
    formBody.append('email', data.email);
    formBody.append('relationship', data.relationship);
    formBody.append('isAttending', data.isAttending);
    formBody.append('needsElectronicInvite', data.needsElectronicInvite);
    formBody.append('adultCount', data.adultCount.toString());
    formBody.append('childCount', data.childCount.toString());
    formBody.append('needsHighChair', data.needsHighChair ? 'Yes' : 'No');
    formBody.append('isVegetarian', data.isVegetarian ? 'Yes' : 'No');
    formBody.append('notes', data.notes);
    formBody.append('submissionDate', new Date().toISOString());

    // mode: 'no-cors' is often required for Google Scripts to avoid CORS errors in browser console,
    // though it makes the response opaque.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
      mode: 'no-cors' 
    });

    // Since we use no-cors, we can't truly know if it failed on the server logic side 
    // without a more complex proxy, but we assume network success means delivery.
    return true;
  } catch (error) {
    console.error("Error submitting form:", error);
    return false;
  }
};