import api from "./axios.config";
import type { HostRequest } from "../types/HostRequest";

export const createHostRequest = (hostRequest: Partial<HostRequest>) =>
  api.post<HostRequest>(`/user/hosts/request`, hostRequest);

// ADMIN
export const getAllHostRequests = () =>
  api.get<HostRequest[]>(`/admin/hosts/request`);

export const approveHostRequest = (
  hostRequestId: number,
  hostRequest: Partial<HostRequest>,
) =>
  api.put<HostRequest>(
    `/admin/hosts/requests/${hostRequestId}/approve`,
    hostRequest,
  );

export const denyHostRequest = (
  hostRequestId: number,
  hostRequest: Partial<HostRequest>,
) =>
  api.put<HostRequest>(
    `/admin/hosts/requests/${hostRequestId}/deny`,
    hostRequest,
  );

export const deleteHostRequest = (hostRequestId: number) =>
  api.delete<HostRequest>(`/host/requests/${hostRequestId}`);
