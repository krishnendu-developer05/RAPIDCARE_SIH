import { supabase } from '../config/supabase.js';

/**
 * GET /api/ambulances
 */
export async function getAmbulances(req, res) {
  try {
    const { hospital_id, type } = req.query;

    let query = supabase.from('ambulances').select('*, hospitals(name, address)');

    if (hospital_id) {
      query = query.eq('hospital_id', hospital_id);
    }
    if (type) {
      query = query.eq('ambulance_type', type);
    }

    const { data: ambulances, error } = await query;

    if (error || !ambulances || ambulances.length === 0) {
      const mockAmbulances = [
        {
          id: 'amb-01',
          vehicle_number: 'WB 24 AC 1080',
          driver_name: 'Rajesh Kumar',
          driver_phone: '+91 98765 43210',
          ambulance_type: 'basic',
          is_available: true,
          price_base: 450,
          eta_minutes: 9,
        },
        {
          id: 'amb-02',
          vehicle_number: 'WB 24 AC 2024',
          driver_name: 'Amit Sharma',
          driver_phone: '+91 98765 43211',
          ambulance_type: 'advanced',
          is_available: true,
          price_base: 850,
          eta_minutes: 12,
        },
        {
          id: 'amb-03',
          vehicle_number: 'WB 24 AC 3099',
          driver_name: 'Subhashish Das',
          driver_phone: '+91 98765 43212',
          ambulance_type: 'transport',
          is_available: true,
          price_base: 300,
          eta_minutes: 15,
        },
      ];

      return res.json({
        success: true,
        count: mockAmbulances.length,
        data: mockAmbulances,
        source: 'mock_fallback',
      });
    }

    return res.json({
      success: true,
      count: ambulances.length,
      data: ambulances,
    });
  } catch (error) {
    console.error('getAmbulances error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while fetching ambulances.',
    });
  }
}
