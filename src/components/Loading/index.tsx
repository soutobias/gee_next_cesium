"use client"
import React from 'react';
import styles from './Loading.module.css'
import { useContextHandle } from '../../context/contextHandle';

export function Loading() {
  const { loading } = useContextHandle()
  return (
    <>
      {loading && (
        <div id="loading" className={styles.LoadingContainer}>
          <div className={styles.LoadingSpinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  )
}
