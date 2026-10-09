import {useCallback, useEffect} from 'react';
import {Linking} from 'react-native';
import * as Location from 'expo-location';
import {create} from 'zustand';

import {
  BASE_SHIP_FEE,
  VARIANT,
} from '@constants/student';

export type LocationPermissionStatus =
  | 'granted'
  | 'denied'
  | 'blocked';

export type CampusLocation = {
  latitude: number;
  longitude: number;
};

// Tọa độ cố định KTX ĐH Công nghiệp TP.HCM (IUH)
export const CAMPUS_LOCATION: CampusLocation = {
  latitude: 10.8221,
  longitude: 106.6868,
};

// Tọa độ giả lập cho máy ảo gần KTX (~1.2 km)
export const MOCK_USER_LOCATION: CampusLocation = {
  latitude: 10.8295,
  longitude: 106.6785,
};

export function haversineDistanceKm(
  from: CampusLocation,
  to: CampusLocation,
): number {
  const earthRadiusKm = 6371;

  const dLat =
    ((to.latitude - from.latitude) * Math.PI) / 180;
  const dLon =
    ((to.longitude - from.longitude) * Math.PI) / 180;

  const lat1 = (from.latitude * Math.PI) / 180;
  const lat2 = (to.latitude * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export function calculateShippingFee(
  distanceKm: number | null,
): number | null {
  if (distanceKm === null) return null;

  if (VARIANT.shipFormula === 'A') {
    // Công thức A = BASE_SHIP_FEE + Math.round(km * 2000)
    return BASE_SHIP_FEE + Math.round(distanceKm * 2000);
  }

  // Công thức B = BASE_SHIP_FEE + Math.round(km * 1500) + 2000
  return BASE_SHIP_FEE + Math.round(distanceKm * 1500) + 2000;
}

type LocationStoreState = {
  status: LocationPermissionStatus;
  location: CampusLocation | null;
  distanceKm: number | null;
  shippingFee: number | null;
  hasRequested: boolean;
  setStatus: (status: LocationPermissionStatus) => void;
  setLocationData: (coords: CampusLocation, dist: number, fee: number) => void;
  clearLocation: () => void;
};

const useLocationStore = create<LocationStoreState>(set => ({
  status: 'denied',
  location: null,
  distanceKm: null,
  shippingFee: null,
  hasRequested: false,
  setStatus: status => set({status}),
  setLocationData: (coords, dist, fee) =>
    set({
      status: 'granted',
      location: coords,
      distanceKm: dist,
      shippingFee: fee,
      hasRequested: true,
    }),
  clearLocation: () =>
    set({
      location: null,
      distanceKm: null,
      shippingFee: null,
    }),
}));

export function useCampusLocation() {
  const {
    status,
    location,
    distanceKm,
    shippingFee,
    setStatus,
    setLocationData,
  } = useLocationStore();

  const loadPositionAndCompute = useCallback(async () => {
    try {
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      let userCoords: CampusLocation = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      };

      // Nếu máy ảo trả về tọa độ xa hơn 50km hoặc 0,0, dùng mock tọa độ gần cổng KTX (~1.2 km)
      const measuredDist = haversineDistanceKm(
        userCoords,
        CAMPUS_LOCATION,
      );

      if (
        measuredDist > 50 ||
        (userCoords.latitude === 0 && userCoords.longitude === 0)
      ) {
        userCoords = MOCK_USER_LOCATION;
      }

      const finalDist = haversineDistanceKm(
        userCoords,
        CAMPUS_LOCATION,
      );
      const fee = calculateShippingFee(finalDist)!;

      setLocationData(userCoords, finalDist, fee);
    } catch {
      // Mock trên simulator/emulator khi chưa có GPS cứng
      const userCoords = MOCK_USER_LOCATION;
      const finalDist = haversineDistanceKm(
        userCoords,
        CAMPUS_LOCATION,
      );
      const fee = calculateShippingFee(finalDist)!;

      setLocationData(userCoords, finalDist, fee);
    }
  }, [setLocationData]);

  const checkPermission = useCallback(async () => {
    try {
      const permission =
        await Location.getForegroundPermissionsAsync();

      if (permission.granted) {
        setStatus('granted');
        await loadPositionAndCompute();
        return;
      }

      if (!permission.canAskAgain) {
        setStatus('blocked');
        return;
      }

      setStatus('denied');
    } catch {
      setStatus('denied');
    }
  }, [loadPositionAndCompute, setStatus]);

  const requestLocation = useCallback(async () => {
    try {
      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.granted) {
        setStatus('granted');
        await loadPositionAndCompute();
        return;
      }

      if (!permission.canAskAgain) {
        setStatus('blocked');
        await Linking.openSettings();
        return;
      }

      setStatus('denied');
    } catch {
      setStatus('denied');
    }
  }, [loadPositionAndCompute, setStatus]);

  const openSettings = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    status,
    location,
    distanceKm,
    shippingFee,
    requestLocation,
    openSettings,
  };
}