import { expect, test } from 'vitest';
import scheduleClinicalConsultation from './scheduleClinicalConsultation';

test('Create a Clinical Consultation', () => {
    const appointment = new scheduleClinicalConsultation()
    const response = appointment.execute({
        clinicianId: '1',
        patientId: '1',
        appointmentDate: new Date(Date.UTC(2021, 0, 1, 0, 0, 0))
    })

    expect(response.appointmentDate.toISOString()).toEqual('2021-01-01T00:00:00.000Z')
});
