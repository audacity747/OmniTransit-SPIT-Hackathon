
from django.shortcuts import render
import os

def index(request):
    # Strictly Mumbai context for initial render
    context = {
        'cities': [
            {'id': 'mumbai', 'name': 'Mumbai', 'hubs': ['Dadar', 'Churchgate', 'Andheri', 'CST', 'Thane', 'Borivali', 'Kurla', 'Kalyan']}
        ],
        'initial_routes': [
            {
                'id': 'm1',
                'routeNo': 'VIRAR FAST',
                'mode': ['TRAIN'],
                'duration': 45,
                'cost': 15,
                'distance': 32,
                'pulseStatus': 'CROWDED',
                'pulseDescription': 'Platform 5 at Dadar is packed. Heavy rush at Borivali. Use the 15-coach indicator.'
            },
            {
                'id': 'm2',
                'routeNo': 'BORIVALI SLOW',
                'mode': ['TRAIN'],
                'duration': 65,
                'cost': 10,
                'distance': 28,
                'pulseStatus': 'NORMAL',
                'pulseDescription': 'All stops slow local. PF 1 at Churchgate is clear.'
            }
        ],
        'initial_reports': [
            {
                'id': 'rep1',
                'type': 'CROWD',
                'location': 'Dadar Platform 1',
                'description': 'Avoid the middle bridge. Use the North FOB for smoother interchange to Western Line.',
                'verified': True,
                'consensusCount': 42
            }
        ],
        'api_key': os.environ.get('API_KEY', '')
    }
    return render(request, 'index.html', context)
