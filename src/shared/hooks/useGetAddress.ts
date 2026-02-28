import { useMutation } from "@tanstack/react-query"
import { getAddress } from "../services/apiGeocoding"

interface PositionType {
  latitude: number;
  longitude: number;
}


function useGetAddress() {
  const {data,mutate} = useMutation({
    mutationKey: ["address"],
    mutationFn: ({latitude, longitude}:PositionType) => getAddress({latitude, longitude}),
  });


  return {data,mutate};
}

export default useGetAddress
